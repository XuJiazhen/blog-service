import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      MONGO_URL: Joi.string().required(),
      DEFAULT_USERNAME: Joi.string().required(),
      DEFAULT_PWD: Joi.string().required(),

      APP_PORT: Joi.number().required(),
    });
    const { error, value: ValidatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return ValidatedEnvConfig;
  }

  public get MONGO_URL(): string {
    return this.envConfig.MONGO_URL;
  }

  public get DEFAULT_USERNAME(): string {
    return this.envConfig.DEFAULT_USERNAME;
  }

  public get DEFAULT_PWD(): string {
    return this.envConfig.DEFAULT_PWD;
  }

  public get APP_PORT(): number {
    return Number(this.envConfig.APP_PORT);
  }
}

const config = new ConfigService(
  `${process.env.NODE_ENV || 'development'}.env`,
);

export { config };
