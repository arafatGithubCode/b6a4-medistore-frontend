export interface IMedicine {
  name: string;
  id: string;
  brand: string;
  description: string;
  slug: string;
  dosageForm: DosageForm;
  unit: Unit;
  strength: string;
  stock: number;
  price: number;
  image: string;
  status: MedicineStatus;
  isOTCOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
  categoryId: string;
}

export enum DosageForm {
  TABLET,
  CAPSULE,
  SYRUP,
  INJECTION,
  OINTMENT,
  DROPS,
  INHALER,
  PATCH,
  SUPPOSITORY,
  POWDER,
}

export enum Unit {
  MG,
  ML,
  G,
  IU,
  MCG,
}

export enum MedicineStatus {
  AVAILABLE = "AVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
}
