export const brandAccentClass = "accent-coral";

export const getCategoryAccentClass = (name: string) => {
  const key = name.toLowerCase();
  if (key === "starter sorts") return "accent-sky";
  if (key === "color control") return "accent-violet";
  if (key === "tight space") return "accent-orange";
  return brandAccentClass;
};
