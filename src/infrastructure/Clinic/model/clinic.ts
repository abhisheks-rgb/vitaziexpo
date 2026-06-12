export interface ClinicVisit {
  id: string;
  date: string;
  image: any; // AppImageSource — swap for real retinal images
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  icon?: any;
  visits: ClinicVisit[];
}
