import * as Joi from 'joi';

export const envSchema = Joi.object({
  // redis
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_PASSWORD: Joi.string(),
  // postgres
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number(),
  POSTGRES_USER_NAME: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_BASE_NAME: Joi.string(),
  POSTGRES_SYNCHRONIZE: Joi.boolean(),
  // rabbitmq
  RABBITMQ_PROTOCOL: Joi.string(),
  RABBITMQ_HOST: Joi.string(),
  RABBITMQ_PORT: Joi.number(),
  RABBITMQ_USER_NAME: Joi.string(),
  RABBITMQ_PASSWORD: Joi.string(),
  RABBITMQ_DB_ACCESS_QUEUE: Joi.string()
})