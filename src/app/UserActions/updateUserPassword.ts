"use server";
import { updatePasswordSchemaType } from "../../schema/updatePassword.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function UpdatePasswordUser(values: updatePasswordSchemaType) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Please Login To Update Your Password");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed with status ${res.status}: ${errorText}`);
    }

    console.log(res);
    const payload = await res.json();

    return payload;
  } catch (err) {
    return err;
  }
}
