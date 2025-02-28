import { ComboJobTypes } from "@repo/utils";
import SophtronBaseClient from "./apiClient.base";

const SophtronJobTypeMap = {
  [ComboJobTypes.ACCOUNT_NUMBER]: "verification",
  [ComboJobTypes.ACCOUNT_OWNER]: "identity",
  [ComboJobTypes.TRANSACTIONS]: "aggregate",
  [ComboJobTypes.TRANSACTION_HISTORY]: "history",
};

const convertToSophtronJobTypes = (jobTypes: ComboJobTypes[]) =>
  jobTypes
    .map((jobType: ComboJobTypes) => SophtronJobTypeMap[jobType])
    .join("|");

export default class SophtronV2Client extends SophtronBaseClient {
  async getCustomer(customerId) {
    return await this.get(`/v2/customers/${customerId}`);
  }

  async getCustomerByUniqueName(uniqueName) {
    const arr = await this.get(`/v2/customers?uniqueID=${uniqueName}`);
    return arr?.[0];
  }

  async createCustomer(uniqueName) {
    return await this.post("/v2/customers", {
      UniqueID: uniqueName,
      Source: `Universal_Widget_${this.envConfig.HOSTURL}`,
      Name: "UniversalWidget_Customer",
    });
  }

  async deleteCustomer(customerId) {
    return await this.del(`/v2/customers/${customerId}`);
  }

  async getMember(customerId, memberId) {
    return await this.get(`/v2/customers/${customerId}/members/${memberId}`);
  }

  async createMember(
    customerId,
    jobTypes: ComboJobTypes[],
    username,
    password,
    institutionId,
  ) {
    return await this.post(
      `/v2/customers/${customerId}/members/${convertToSophtronJobTypes(jobTypes)}`,
      {
        UserName: username,
        Password: password,
        InstitutionID: institutionId,
      },
    );
  }

  async updateMember(customerId, memberId, jobTypes, username, password) {
    return await this.put(
      `/v2/customers/${customerId}/members/${memberId}/${convertToSophtronJobTypes(jobTypes)}`,
      {
        UserName: username,
        Password: password,
      },
    );
  }

  async refreshMember(customerId, memberId, jobTypes) {
    return await this.post(
      `/v2/customers/${customerId}/members/${memberId}/${convertToSophtronJobTypes(jobTypes)}`,
    );
  }

  async deleteMember(customerId, memberId) {
    return await this.del(`/v2/customers/${customerId}/members/${memberId}`);
  }

  async getJobInfo(jobId) {
    return await this.get(`/v2/job/${jobId}`);
  }

  async answerJobMfa(jobId, mfaType, answer) {
    return await this.put(`/v2/job/${jobId}/challenge/${mfaType}`, {
      AnswerText: answer,
    });
  }
}
