import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => row.original.phoneNumber || "N/A",
  },
  {
    accessorKey: "emergencyContact",
    header: "Emergency Contact",
    cell: ({ row }) => row.original.emergencyContact || "N/A",
  },
  {
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ row }) =>
      row.original.profileImage ? (
        <Image
          src={row.original.profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];
