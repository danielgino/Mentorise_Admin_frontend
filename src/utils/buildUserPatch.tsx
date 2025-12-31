import { mapLabelToRole, type RoleDto} from "../api/NormalizeUser.tsx";
import type {ApiUserDto} from "../types/User.tsx";


const normalizeWhitespace = (s = "") => s.replace(/\s+/g, " ").trim();
const normalizePhone = (p = "") => p.replace(/[^\d+\-\s()]/g, "").trim();

type Updatable = Pick<ApiUserDto,
    "firstName" | "lastName" | "email" | "phoneNumber" | "role" | "isAlumni"
>;

type UiEditable = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isAlumni: boolean;
};

export function buildUserPatch(original: ApiUserDto, ui: UiEditable): Partial<Updatable> {
    const patch: Partial<Updatable> = {};

    const firstName = normalizeWhitespace(ui.firstName);
    if (original.firstName !== firstName) patch.firstName = firstName;

    const lastName = normalizeWhitespace(ui.lastName);
    if (original.lastName !== lastName) patch.lastName = lastName;

    const email = normalizeWhitespace(ui.email).toLowerCase();
    if (original.email !== email) patch.email = email;

    const phoneNumber = normalizePhone(ui.phoneNumber);
    if (original.phoneNumber !== phoneNumber) patch.phoneNumber = phoneNumber;

    const role: RoleDto = mapLabelToRole(ui.role);
    if (original.role !== role) patch.role = role;

    if (original.isAlumni !== ui.isAlumni) patch.isAlumni = ui.isAlumni;

    return patch;

}
