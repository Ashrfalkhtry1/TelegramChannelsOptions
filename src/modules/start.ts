import { MyContext } from "../core/types.ts";
import { addUser } from "../database/usersDb.ts";

import { Composer, InlineKeyboard } from "grammy/mod.ts";

const composer = new Composer<MyContext>();

// Set the bot owner's Telegram ID
const BOT_OWNER_ID = 1095477203;

composer.command("start", async (ctx) => {
  console.log("Context:", JSON.stringify(ctx, null, 2)); // Log full context object for debugging
  console.log("User ID:", ctx.from?.id); // Log user ID
  console.log("Owner ID:", BOT_OWNER_ID); // Log owner ID for comparison

  if (ctx.chat.type != "private") return;

  // Check if the user is the bot owner
  if (ctx.from!.id === BOT_OWNER_ID) {
    await ctx.reply("👋 مرحبًا بك في لوحة التحكم الخاصة بالبوت:", {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard()
        .text("⚙️ الإعدادات العامة", "settings").row()
        .text("✏️ تعديل رسالة الترحيب /start", "edit_start").row()
        .text("📌 الاشتراك الإجباري", "mandatory_subscription").row()
        .text("👥 الأدمنية", "admins").row()
        .text("📊 الإحصائيات", "stats").row()
        .text("📢 الإذاعة", "broadcast").row()
        .text("📩 مكان استلام الرسائل", "message_location").row(),
    });
    return;
  }

  // Default start message for non-owner users
  await ctx.reply(ctx.t("start-msg", { user: ctx.from!.first_name }), {
    parse_mode: "HTML",
    reply_markup: new InlineKeyboard()
      .text(ctx.t("usage-help"), "helper")
      .text("Language 🌐", "setLang").row()
      .url(ctx.t("updates"), "https://t.me/BotzHub"),
    disable_web_page_preview: true,
  });
  await addUser(ctx.from!.id);
});

// Callback query handlers for control panel options
composer.callbackQuery("settings", async (ctx) => {
  await ctx.answerCallbackQuery("⚙️ الإعدادات العامة قيد التنفيذ");
});

composer.callbackQuery("edit_start", async (ctx) => {
  await ctx.answerCallbackQuery("✏️ تعديل رسالة الترحيب قيد التنفيذ");
});

composer.callbackQuery("mandatory_subscription", async (ctx) => {
  await ctx.answerCallbackQuery("📌 الاشتراك الإجباري قيد التنفيذ");
});

composer.callbackQuery("admins", async (ctx) => {
  await ctx.answerCallbackQuery("👥 إدارة الأدمنية قيد التنفيذ");
});

composer.callbackQuery("stats", async (ctx) => {
  await ctx.answerCallbackQuery("📊 الإحصائيات قيد التنفيذ");
});

composer.callbackQuery("broadcast", async (ctx) => {
  await ctx.answerCallbackQuery("📢 الإذاعة قيد التنفيذ");
});

composer.callbackQuery("message_location", async (ctx) => {
  await ctx.answerCallbackQuery("📩 مكان استلام الرسائل قيد التنفيذ");
});

export default composer;
