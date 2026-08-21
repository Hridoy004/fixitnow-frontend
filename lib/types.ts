import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  activeStatus: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface ICurrentUserResponse {
  success: boolean;
  message?: string;
  data: {
    profile: IUser;
  };
}

export interface NavbarProps {
  user: ICurrentUserResponse;
}

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IServicePayload {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  technicianId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  category: ICategory;
}

export interface IReview {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;

  customer?: IUser;
}

export interface ITechnician {
  id: string;
  userId: string;
  bio: string;
  experience: number;
  location: string;
  hourlyRate: number;
  averageRating: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;

  user: IUser;
  services: IService[];
  reviews: IReview[];
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface IBooking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;

  bookingDate: string;
  totalAmount: number;
  status: BookingStatus;

  createdAt: string;
  updatedAt: string;

  customer: IUser;
  technician: ITechnician;
  service: IService;
  review: IReview | null;
}

export interface IDashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalTechnicians: number;
  bookingsThisMonth: number;
  revenueThisMonth: number;
}
