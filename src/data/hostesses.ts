// Public hostess directory: names, roles and photos only — contacts stay in the admin-only table.
import h02 from '@/assets/hotesses/h02.jpg.asset.json';
import h03 from '@/assets/hotesses/h03.jpg.asset.json';
import h04 from '@/assets/hotesses/h04.jpg.asset.json';
import h05 from '@/assets/hotesses/h05.jpg.asset.json';
import h06 from '@/assets/hotesses/h06.jpg.asset.json';
import h07 from '@/assets/hotesses/h07.jpg.asset.json';
import h08 from '@/assets/hotesses/h08.jpg.asset.json';
import h09 from '@/assets/hotesses/h09.jpg.asset.json';
import h10 from '@/assets/hotesses/h10.jpg.asset.json';
import h11 from '@/assets/hotesses/h11.jpg.asset.json';
import h12 from '@/assets/hotesses/h12.jpg.asset.json';
import h13 from '@/assets/hotesses/h13.jpg.asset.json';
import h14 from '@/assets/hotesses/h14.jpg.asset.json';
import h15 from '@/assets/hotesses/h15.jpg.asset.json';
import h16 from '@/assets/hotesses/h16.jpg.asset.json';
import h17 from '@/assets/hotesses/h17.jpg.asset.json';
import h18 from '@/assets/hotesses/h18.jpg.asset.json';
import h19 from '@/assets/hotesses/h19.jpg.asset.json';
import h20 from '@/assets/hotesses/h20.jpg.asset.json';
import h21 from '@/assets/hotesses/h21.jpg.asset.json';
import h22 from '@/assets/hotesses/h22.jpg.asset.json';
import h23 from '@/assets/hotesses/h23.jpg.asset.json';
import h24 from '@/assets/hotesses/h24.jpg.asset.json';
import h25 from '@/assets/hotesses/h25.jpg.asset.json';
import h26 from '@/assets/hotesses/h26.jpg.asset.json';

export interface Hostess { name: string; position: string; photo: string | null }

export const hostesses: Hostess[] = [
  { name: "Maboa Samanta", position: "Hôtesse événementielle", photo: h02.url },
  { name: "Elodie Elomo Rachel", position: "Hôtesse événementielle", photo: h03.url },
  { name: "Kouam Kamgaing Dianie Richelle", position: "Hôtesse événementielle", photo: h04.url },
  { name: "Ambed Akono Solange", position: "Hôtesse événementielle", photo: h05.url },
  { name: "Lissouck Lorinda Emmanuella Jacky", position: "Hôtesse événementielle", photo: h06.url },
  { name: "Bella Etoundi Véronique Samuelle", position: "Hôtesse événementielle", photo: h07.url },
  { name: "Ntang Kevine Daniella Aimee", position: "Hôtesse événementielle", photo: h08.url },
  { name: "Siemeni Ingride Perelle", position: "Hôtesse événementielle", photo: h09.url },
  { name: "Joyce Moussi Djeukam", position: "Hôtesse événementielle", photo: h10.url },
  { name: "Myrrha Heles Marène Carole", position: "Hôtesse événementielle", photo: h11.url },
  { name: "Sielidji Tayomnou Blinda", position: "Hôtesse événementielle", photo: h12.url },
  { name: "Ngan Marie-thérèse", position: "Hôtesse événementielle", photo: h13.url },
  { name: "Blessing Ngassa Francelle", position: "Hôtesse / Steward", photo: h14.url },
  { name: "Dibanga Nfout Assana", position: "Hôtesse / Steward", photo: null },
  { name: "Domsu Ngangue Paul Adrielle", position: "Hôtesse événementielle", photo: h15.url },
  { name: "Meffeu Biruendi Sinda", position: "Hôtesse événementielle", photo: h16.url },
  { name: "Mekongo Agathe", position: "Hôtesse événementielle", photo: h17.url },
  { name: "Zobo Dominique", position: "Hôtesse événementielle", photo: h18.url },
  { name: "Noupon Tematio Murielle Cyndi", position: "Hôtesse événementielle", photo: h19.url },
  { name: "Danou Siewe Belvanie Sharone", position: "Hôtesse événementielle", photo: h20.url },
  { name: "Etoundi Grâce Cyrielle Private Rose", position: "Hôtesse événementielle", photo: h21.url },
  { name: "Elong Océane Marion", position: "Hôtesse événementielle", photo: h22.url },
  { name: "Ngo Sak Marie Étoile", position: "Hôtesse événementielle", photo: h23.url },
  { name: "Ella Amougou Arielle", position: "Hôtesse événementielle", photo: h24.url },
  { name: "Benku Ilona Preckka", position: "Hôtesse événementielle", photo: h25.url },
  { name: "Iewe Ngadjui Ornella Gernique", position: "Hôtesse événementielle", photo: h26.url },
];

export const hostessPhotos: Record<string, string> = { h02: h02.url, h03: h03.url, h04: h04.url, h05: h05.url, h06: h06.url, h07: h07.url, h08: h08.url, h09: h09.url, h10: h10.url, h11: h11.url, h12: h12.url, h13: h13.url, h14: h14.url, h15: h15.url, h16: h16.url, h17: h17.url, h18: h18.url, h19: h19.url, h20: h20.url, h21: h21.url, h22: h22.url, h23: h23.url, h24: h24.url, h25: h25.url, h26: h26.url };
