export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(
    "en-US",
    options || {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
};

export const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
};

export const getInitials = (firstName: string, lastName: string) => {
  return (firstName[0] + lastName[0]).toUpperCase();
};