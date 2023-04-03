import sanitizeHtml from "sanitize-html";

export const sanitizeInputs = (inputs: any): { [key: string]: string } => {
    return Object.entries(inputs).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      acc[key] = sanitizeHtml(value as string);
      return acc;
    }, {});
  };

  