import { ComboJobTypes } from "@repo/utils";
import { TEST_EXAMPLE_A_AGGREGATOR_STRING } from "../../../../src/test-adapter/constants";

describe("institution by guid", () => {
  it("returns an institution by the aggregator guid when given an aggregator", () => {
    const testExampleAGuid = "stringIdReturnedByTheTestAdapter";

    cy.request({
      headers: {
        meta: JSON.stringify({
          aggregator: TEST_EXAMPLE_A_AGGREGATOR_STRING,
        }),
      },
      url: `/institutions/${testExampleAGuid}`,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const { body } = response;

      const expectedProperties = [
        "aggregator",
        "guid",
        "name",
        "url",
        "logo_url",
        "code",
      ];

      expect(body.code).to.eq(testExampleAGuid);

      expectedProperties.forEach((property) => {
        expect(body[property]).to.exist;
      });
    });
  });

  it("returns an institution when not given an aggregator but given a UCP id and a job type", () => {
    const testExampleAUCPId = "5e498f60-3496-4299-96ed-f8eb328ae8af";

    cy.request({
      headers: {
        meta: JSON.stringify({
          jobTypes: [ComboJobTypes.TRANSACTIONS],
        }),
      },
      url: `/institutions/${testExampleAUCPId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const { body } = response;

      const expectedProperties = [
        "aggregator",
        "guid",
        "name",
        "url",
        "logo_url",
        "code",
      ];

      expectedProperties.forEach((property) => {
        expect(body[property]).to.exist;
      });
    });
  });
});
