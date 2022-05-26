import {BusinessUserRolesEntity} from "./entities/business.users.roles.entity.app";

export interface Company {

    companyId: number;

    businessUuId: string;

    titleFull: string;

    address?: string;

    postCode?: string;

    city?: string;

    legalForm: [
        'soleProprietorship',
        'joint_partnership',
        'foundation',
        'corporation',
        'limitedLiabilityCompany',
        'association'
    ];

    contactPersonFirstName?: string;

    contactPhone?: string;

    logoSrc?: string;

    bannerSrc?: string;

    pageSrc?: string;

    // Finances
    vatEnabled: boolean;

    vatNumber: boolean;

    taxIncomeId: number;

    taxExpenseId: number;

    //Options
    testMode?: boolean;

    createdAt?: number; // year

    roles: BusinessUserRolesEntity[];

    getId():number

    toSimpleJson():Record<string, this>
}