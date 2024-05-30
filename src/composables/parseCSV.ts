import Papa from "papaparse";
import { FileParsedData, GroupedDataByProfile } from "../types/types";

// Function to parse CSV and return grouped data
export const parseCSV = (file: File): Promise<GroupedDataByProfile[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results: { data: FileParsedData[] }) => {
        console.log("Parsed CSV:", results.data);

        // Check if the parsed data is empty or does not contain expected fields
        if (!results.data || results.data.length === 0) {
          return reject(new Error("CSV file is empty or invalid."));
        }

        // Validate that the required fields are present in the first row
        const requiredFields = ["Profile Name", "Supplemental Video Type"];
        const firstRow = results.data[0];
        const hasRequiredFields = requiredFields.every(
          (field) => field in firstRow
        );

        if (!hasRequiredFields) {
          return reject(new Error("CSV file is missing required fields."));
        }

        // Filter the parsed data to remove objects with non-empty "Supplemental Video Type"
        const filteredData = results.data.filter(
          (item) => item["Supplemental Video Type"] === ""
        );

        // Group data by "Profile Name"
        const groupedData: { [key: string]: FileParsedData[] } = {};
        filteredData.forEach((item) => {
          const profileName = item["Profile Name"];
          if (!groupedData[profileName]) {
            groupedData[profileName] = [];
          }
          groupedData[profileName].push(item);
        });

        // Convert grouped data to array of objects
        const groupedDataArray: GroupedDataByProfile[] = Object.keys(
          groupedData
        ).map((profileName) => ({
          profileName,
          data: groupedData[profileName],
        }));

        // Output the grouped data
        console.log("Grouped Data by Profile Name:", groupedDataArray);

        // Resolve the promise with the grouped data array
        resolve(groupedDataArray);
      },
      header: true,
      error: (error) => {
        // Reject the promise in case of an error
        reject(error);
      },
    });
  });
};
