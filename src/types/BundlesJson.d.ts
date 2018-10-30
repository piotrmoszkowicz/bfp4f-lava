interface BundlesJsonResponse {
  result: string;
  status: string;
  data: {
    status: string;
    bundles: any[];
  };
}

export { BundlesJsonResponse };
