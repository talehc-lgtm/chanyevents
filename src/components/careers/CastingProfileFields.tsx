import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export type LangLevel = '' | 'courant' | 'moyen' | 'notions';

export const emptyProfile = {
  birth_date: '', birth_place: '', marital_status: '', nationality: '', whatsapp: '',
  sex: '', weight_kg: '', shoe_size: '', tshirt_size: '', pants_size: '', shirt_size: '',
  skills: [] as string[], skills_other: '',
  experience_1: '', experience_2: '', experience_3: '',
  student: '', student_other: '',
  beauty_contest: '', beauty_contest_which: '', agency: '', agency_which: '',
  knew_agency: '', knew_agency_how: '', heard_casting_from: '',
  image_rights: false, signature_name: '',
  parent_name: '', parent_of: '', parent_place: '', parent_date: '', parent_signature: '',
};
export type CastingProfile = typeof emptyProfile;

export const SKILLS = ['Hôtesse / Steward', 'Mannequin', 'Traduction', 'Figurant'];

export const ageFromBirthDate = (d: string): number | null => {
  if (!d) return null;
  const b = new Date(d); if (isNaN(b.getTime())) return null;
  const n = new Date('2026-11-26');
  let a = n.getFullYear() - b.getFullYear();
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
};

interface Props {
  p: CastingProfile;
  set: (patch: Partial<CastingProfile>) => void;
  L: (fr: string, en: string) => string;
}

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-serif text-2xl text-foreground pt-6 border-t border-border">{children}</h3>
);

const F: React.FC<{ id: string; label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; max?: number }> = ({ id, label, value, onChange, type = 'text', required, max = 120 }) => (
  <div>
    <Label htmlFor={id} className="text-foreground text-sm">{label}{required ? ' *' : ''}</Label>
    <Input id={id} type={type} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} className="mt-1.5" />
  </div>
);

const YesNo: React.FC<{ name: string; label: string; value: string; onChange: (v: string) => void; L: Props['L'] }> = ({ name, label, value, onChange, L }) => (
  <div>
    <span className="text-sm text-foreground">{label}</span>
    <div className="flex gap-4 mt-1.5">
      {[['oui', L('Oui', 'Yes')], ['non', L('Non', 'No')]].map(([v, t]) => (
        <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="radio" name={name} checked={value === v} onChange={() => onChange(v)} className="accent-primary" /> {t}
        </label>
      ))}
    </div>
  </div>
);

const CastingProfileFields: React.FC<Props & { section: 'personal' | 'rest' }> = ({ p, set, L, section }) => {
  if (section === 'personal') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <F id="birth_date" type="date" label={L('Date de naissance', 'Date of birth')} required value={p.birth_date} onChange={(v) => set({ birth_date: v })} />
        <F id="birth_place" label={L('Lieu de naissance', 'Place of birth')} value={p.birth_place} onChange={(v) => set({ birth_place: v })} />
        <F id="marital_status" label={L('Situation matrimoniale', 'Marital status')} value={p.marital_status} onChange={(v) => set({ marital_status: v })} />
        <F id="nationality" label={L('Nationalité', 'Nationality')} value={p.nationality} onChange={(v) => set({ nationality: v })} />
      </div>
    );
  }

  const age = ageFromBirthDate(p.birth_date);
  const minor = age !== null && age < 18;
  const toggleSkill = (s: string) => set({ skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s] });

  return (
    <div className="space-y-6">
      <H>{L('Informations professionnelles', 'Professional information')}</H>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <div>
          <Label htmlFor="sex" className="text-foreground text-sm">{L('Sexe', 'Sex')} *</Label>
          <select id="sex" value={p.sex} onChange={(e) => set({ sex: e.target.value })} className="mt-1.5 w-full h-10 rounded-sm border border-border bg-background px-3 text-sm">
            <option value="">—</option><option value="F">{L('Femme', 'Female')}</option><option value="M">{L('Homme', 'Male')}</option>
          </select>
        </div>
        <F id="weight" type="number" label={L('Poids (kg)', 'Weight (kg)')} value={p.weight_kg} onChange={(v) => set({ weight_kg: v })} />
        <F id="shoe" label={L('Pointure', 'Shoe size')} value={p.shoe_size} onChange={(v) => set({ shoe_size: v })} />
        <F id="tshirt" label={L('Taille T-shirt', 'T-shirt size')} value={p.tshirt_size} onChange={(v) => set({ tshirt_size: v })} />
        <F id="pants" label={L('Taille pantalon / jupe', 'Trousers / skirt size')} value={p.pants_size} onChange={(v) => set({ pants_size: v })} />
        <F id="shirt" label={L('Taille chemise', 'Shirt size')} value={p.shirt_size} onChange={(v) => set({ shirt_size: v })} />
      </div>

      <div>
        <span className="text-sm text-foreground">{L('Domaine de compétence', 'Area of skill')}</span>
        <div className="flex flex-wrap gap-3 mt-2">
          {SKILLS.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm border border-border rounded-sm px-3 py-2 cursor-pointer">
              <input type="checkbox" checked={p.skills.includes(s)} onChange={() => toggleSkill(s)} className="accent-primary" /> {s}
            </label>
          ))}
        </div>
        <Input className="mt-3" placeholder={L('Autres (préciser)', 'Other (specify)')} maxLength={120} value={p.skills_other} onChange={(e) => set({ skills_other: e.target.value })} />
      </div>
      <H>{L('Expériences récentes', 'Recent experience')}</H>
      {([1, 2, 3] as const).map((n) => (
        <div key={n}>
          <Label htmlFor={`exp${n}`} className="text-foreground text-sm">{L('Expérience', 'Experience')} {n}{n === 1 ? ' *' : ''}</Label>
          <Textarea id={`exp${n}`} rows={2} maxLength={400} value={p[`experience_${n}`]} onChange={(e) => set({ [`experience_${n}`]: e.target.value } as Partial<CastingProfile>)} className="mt-1.5" placeholder={L('Événement, rôle, année…', 'Event, role, year…')} />
        </div>
      ))}

      <H>{L('Études et carrière', 'Studies and career')}</H>
      <div className="grid md:grid-cols-2 gap-5">
        <YesNo name="student" label={L('Êtes-vous étudiant(e) ?', 'Are you a student?')} value={p.student} onChange={(v) => set({ student: v })} L={L} />
        <F id="student_other" label={L('Autre situation', 'Other situation')} value={p.student_other} onChange={(v) => set({ student_other: v })} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <YesNo name="beauty" label={L('Participation à un concours de beauté ?', 'Taken part in a beauty contest?')} value={p.beauty_contest} onChange={(v) => set({ beauty_contest: v })} L={L} />
          {p.beauty_contest === 'oui' && <Input placeholder={L('Si oui, lequel ?', 'If yes, which?')} maxLength={120} value={p.beauty_contest_which} onChange={(e) => set({ beauty_contest_which: e.target.value })} />}
        </div>
        <div className="space-y-2">
          <YesNo name="agency" label={L('Êtes-vous inscrit(e) à une agence ?', 'Registered with an agency?')} value={p.agency} onChange={(v) => set({ agency: v })} L={L} />
          {p.agency === 'oui' && <Input placeholder={L('Si oui, laquelle ?', 'If yes, which?')} maxLength={120} value={p.agency_which} onChange={(e) => set({ agency_which: e.target.value })} />}
        </div>
      </div>

      <H>{L("Connaissance de l'agence", 'How you know the agency')}</H>
      <div className="space-y-4">
        <YesNo name="knew" label={L("Connaissiez-vous CHANY EVENT'S avant ce casting ?", "Did you know CHANY EVENT'S before this casting?")} value={p.knew_agency} onChange={(v) => set({ knew_agency: v })} L={L} />
        {p.knew_agency === 'oui' && <F id="knew_how" label={L('Si oui, comment ?', 'If yes, how?')} value={p.knew_agency_how} onChange={(v) => set({ knew_agency_how: v })} />}
        <F id="heard" label={L('Comment avez-vous pris connaissance de ce casting ?', 'How did you hear about this casting?')} value={p.heard_casting_from} onChange={(v) => set({ heard_casting_from: v })} />
      </div>

      <div className="p-5 bg-secondary/50 border border-border rounded-sm space-y-4">
        <p className="text-sm text-foreground"><strong>{L("Droit à l'image :", 'Image rights:')}</strong> {L("Compléter et signer ce document autorise CHANY EVENT'S et ses partenaires à utiliser les photos et les vidéos prises dans le cadre des prestations faites pour l'agence, dans tous les supports de communication possibles liés à l'activité de l'agence. Signature obligatoire (signature des parents si l'on est mineur).", "Completing and signing this form authorises CHANY EVENT'S and its partners to use photos and videos taken during services performed for the agency, in all communication media related to the agency's activity. Signature required (parents' signature for minors).")}</p>
        <label className="flex items-start gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={p.image_rights} onChange={(e) => set({ image_rights: e.target.checked })} className="accent-primary mt-1" />
          {L("J'accepte les conditions du droit à l'image *", 'I accept the image rights terms *')}
        </label>
        <F id="signature" label={L('Signature (nom et prénom)', 'Signature (full name)')} required value={p.signature_name} onChange={(v) => set({ signature_name: v })} />
      </div>

      {minor && (
        <div className="p-5 bg-secondary/50 border border-border rounded-sm space-y-4">
          <p className="text-sm font-semibold text-foreground">{L('Autorisation parentale (obligatoire pour les mineurs)', 'Parental authorisation (required for minors)')}</p>
          <div className="grid md:grid-cols-2 gap-5">
            <F id="parent_name" label="Mr / Mme / Mlle" required value={p.parent_name} onChange={(v) => set({ parent_name: v })} />
            <F id="parent_of" label={L('En qualité de parent ou représentant légal de', 'As parent or legal guardian of')} required value={p.parent_of} onChange={(v) => set({ parent_of: v })} />
            <F id="parent_place" label={L('Fait à', 'Signed at')} value={p.parent_place} onChange={(v) => set({ parent_place: v })} />
            <F id="parent_date" type="date" label={L('Le', 'On')} value={p.parent_date} onChange={(v) => set({ parent_date: v })} />
          </div>
          <p className="text-sm text-foreground">{L("L'autorise à participer aux activités et prestations de CHANY EVENT'S.", "Authorises them to take part in CHANY EVENT'S activities and services.")}</p>
          <F id="parent_signature" label={L('Signature du parent (nom et prénom)', "Parent's signature (full name)")} required value={p.parent_signature} onChange={(v) => set({ parent_signature: v })} />
        </div>
      )}
    </div>
  );
};

export default CastingProfileFields;
