export const createProfileAction = async (prevState, formData) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: "Profile Created" };
  } catch (error) {
    console.error("Error in createProfileAction:", error);
    return { message: "There was an error..." };
  }
};
