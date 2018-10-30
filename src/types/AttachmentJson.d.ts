interface AttachmentJsonResponse {
  result: string;
  status: string;
  data: {
    status: string;
    attachments: any[];
  };
}

export { AttachmentJsonResponse };
