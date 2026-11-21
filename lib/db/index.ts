/**
 * lib/db — database access layer
 *
 * Always import from here instead of calling `prisma.*` directly on models
 * that have formerly-Json fields (now stored as String in SQLite).
 *
 * Models without Json fields can still be accessed via the raw prisma client:
 *   import { prisma } from "@/lib/prisma";
 */

export {
  // helpers
  serializeJsonFields,
  deserializeJsonFields,
  deserializeJsonFieldsMany,
  JSON_FIELDS,
  // per-model helpers (auto JSON.stringify / JSON.parse)
  tripChangeLogs,
  paymentTransactions,
  paymentWebhooks,
  notifications,
  adminAuditLogs,
  systemActivityLogs,
  telegramBotUpdates,
  aiActions,
  subscriptions,
  systemSettings,
  systemSettingHistory,
  analyticsEvents,
  tripRecommendations,
} from "./json-fields";
