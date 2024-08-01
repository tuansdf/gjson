import { faker } from "@faker-js/faker";

class FakerService {
  private async generateJson(data: Record<string, string>) {
    const result: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      if (typeof data[key] !== "string") continue;
      const fn = data[key]?.split(".").reduce((acc, key) => acc[key], faker as Record<string, any>) as () => string;
      const val = await fn?.();
      result[key] = val;
    }
    return result;
  }

  public async generateJsons(data: Record<string, string>) {
    const { __count, ...input } = data;
    let count = Number(__count);
    if (count !== 0 && !count) {
      return await this.generateJson(input);
    }
    if (count < 0) {
      count = 0;
    }
    if (count > 1_000) {
      count = 1_000;
    }
    const result: Record<string, any>[] = [];
    for (let i = 0; i < count; i++) {
      result.push(await this.generateJson(input));
    }
    return result;
  }
}

export const fakerService = new FakerService();
