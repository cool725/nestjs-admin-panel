const { MigrationInterface, QueryRunner } = require("typeorm");
const {BexioHelper} = require("../../libs/api/third-party/src");

module.exports = class FinAccounts1654978339511 {

    companyId = 0;
    
    async up(queryRunner) {
        await this.prepare(queryRunner)
        await this.upCategory(queryRunner,this.companyId)
        await this.taxes(queryRunner,this.companyId)
        await this.accounts(queryRunner,this.companyId)
        await this.finish(queryRunner)
    }

     prepare(queryRunner){
       return  queryRunner.query(`SET FOREIGN_KEY_CHECKS=0;`)
     }

     finish(queryRunner){
        return queryRunner.query(`SET FOREIGN_KEY_CHECKS=1;`)
     }

     async upCategory(queryRunner,companyId){
         const cmds =  `INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (${companyId}, 1, 'Aktiven', 1, '39', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (2, 1, 'Umlaufvermögen', 10, '40', 1, 1);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (3, 1, 'Forderungen staatlichen Stellen', 117, '41', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (4, 1, 'Forderungen aus Lieferungen und Leistungen', 110, '42', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (5, 1, 'Flüssige Mittel', 100, '43', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (6, 1, 'Passiven', 2, '44', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (7, 1, 'Kurzfristiges Fremdkapital', 20, '45', 1, 6);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (8, 1, 'Übrige kurzfristige Verbindlichkeiten', 220, '46', 1, 7);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (9, 1, 'Verbindlichkeiten aus Lieferungen und Leistungen', 200, '47', 1, 7);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (10, 1, 'Betrieblicher Ertrag', 3, '48', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (11, 1, 'Erlösminderung', 38, '49', 1, 10);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (12, 1, 'Erlösminderung', 380, '50', 1, 11);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (13, 1, 'Handelserlös', 32, '51', 1, 10);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (14, 1, 'Handelserlös', 320, '52', 1, 13);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (15, 1, 'Aufwand für Material, Handel, Dienstleistung', 4, '53', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (16, 1, 'Einkaufspreisminderungen', 49, '54', 1, 15);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (17, 1, 'Einkaufspreisminderungen', 490, '55', 1, 16);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (18, 1, 'Handelswarenaufwand', 42, '56', 1, 15);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (19, 1, 'Handelswarenaufwand', 420, '57', 1, 18);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (20, 1, 'Personalaufwand', 5, '58', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (21, 1, 'Betrieblicher Aufwand', 6, '59', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (22, 1, 'Abschreibung / WB Anlagevermögen', 68, '60', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (23, 1, 'Finanzaufwand und Finanzertrag', 69, '61', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (24, 1, 'Finanzertrag', 695, '62', 1, 23);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (25, 1, 'Finanzaufwand', 690, '63', 1, 23);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (26, 1, 'Ausserordentlicher Aufwand / Ertrag', 8, '64', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (27, 1, 'Betriebsfremder Aufwand und betriebsfremder Ertrag', 80, '65', 1, 26);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (28, 1, 'Ausserordentlicher, einmaliger oder periodenfremder Aufwand und Ertrag', 85, '66', 1, 26);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (29, 1, 'Abschluss', 9, '67', 1, null);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (30, 1, 'Abschluss', 91, '68', 1, 29);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (31, 1, 'Anlagevermögen', 14, '69', 1, 1);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (32, 1, 'Mobile Sachanlagen', 150, '70', 1, 31);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (33, 1, 'Transferkonto', 109, '71', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (34, 1, 'Ford. Sozialvers./Kautionen/Depot', 118, '72', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (35, 1, 'Vorräte / nicht fakturierte Dienstleistungen', 120, '73', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (36, 1, 'Aktive Rechnungsabgrenzungen', 130, '74', 1, 2);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (37, 1, 'Kurzfristige Verbindlichkeiten', 210, '75', 1, 7);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (38, 1, 'Verbindlichkeiten Sozialversicherungen', 227, '76', 1, 7);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (39, 1, 'Passive Rechnungsabgrenzungen', 230, '77', 1, 7);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (40, 1, 'Langfristiges Fremdkapital', 24, '78', 1, 6);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (41, 1, 'Langfristige Verbindlichkeiten', 240, '79', 1, 40);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (42, 1, 'Eigenkapital (Einzelunternehmen)', 28, '80', 1, 6);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (43, 1, 'Eigenkapital zu Beginn des Geschäftsjahrs', 280, '81', 1, 42);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (44, 1, 'Kapitaleinlagen und Kapitalrückzüge', 282, '82', 1, 42);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (45, 1, 'Privat', 285, '83', 1, 42);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (46, 1, 'Jahresgewinn oder Jahresverlust', 289, '84', 1, 42);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (47, 1, 'Dienstleistungserlös', 34, '85', 1, 10);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (48, 1, 'Dienstleistungserlös', 340, '86', 1, 47);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (49, 1, 'Übrige Erlöse', 36, '87', 1, 10);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (50, 1, 'Nebenerlös Lieferungen und Leistungen', 360, '88', 1, 49);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (51, 1, 'Bestandesänderungen', 39, '89', 1, 10);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (52, 1, 'Bestandsänderungen Dienstleistungen', 394, '90', 1, 51);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (53, 1, 'Materialaufwand', 40, '91', 1, 15);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (54, 1, 'Aufwand für bezogene Dienstleistungen', 44, '92', 1, 15);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (55, 1, 'Aufwand für bezogene Dienstleistungen', 440, '93', 1, 54);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (56, 1, 'Personalaufwand', 50, '94', 1, 20);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (57, 1, 'Lohnaufwand', 500, '95', 1, 56);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (58, 1, 'Sozialversicherungsaufwand', 57, '96', 1, 20);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (59, 1, 'Sozialversicherungsaufwand', 570, '97', 1, 58);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (60, 1, 'Übriger Personalaufwand', 58, '98', 1, 20);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (61, 1, 'Aus- und Weiterbildung', 581, '99', 1, 60);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (62, 1, 'Spesenentschädigung effektiv', 582, '100', 1, 60);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (63, 1, 'Spesenentschädigung pauschal', 583, '101', 1, 60);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (64, 1, 'Sonstiger Personalaufwand', 588, '102', 1, 60);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (65, 1, 'Privatanteile Personalaufwand', 589, '103', 1, 60);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (66, 1, 'Raumaufwand', 60, '104', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (67, 1, 'Fremdmiete Geschäftslokalitäten', 600, '105', 1, 66);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (68, 1, 'Unterhalt, Reparaturen, Ersatz (URE), Leasing', 61, '106', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (69, 1, 'URE Maschinen und Einrichtungen', 610, '107', 1, 68);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (70, 1, 'Fahrzeug und Transportaufwand', 62, '108', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (71, 1, 'Fahrzeugaufwand', 620, '109', 1, 70);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (72, 1, 'Sachversicherungen, Abgaben, Gebühren, Bewilligungen', 63, '110', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (73, 1, 'Sachversicherungen', 630, '111', 1, 72);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (74, 1, 'Abgaben, Gebühren, Bewilligungen', 636, '112', 1, 72);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (75, 1, 'Energie- und Entsorgungsaufwand', 64, '113', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (76, 1, 'Energie- und Entsorgungsaufwand', 640, '114', 1, 75);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (77, 1, 'Verwaltungs- und Informatikaufwand', 65, '115', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (78, 1, 'Verwaltungsaufwand', 650, '116', 1, 77);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (79, 1, 'Informatikaufwand', 657, '117', 1, 77);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (80, 1, 'Werbeaufwand', 66, '118', 1, 21);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (81, 1, 'Werbeinserate, elektronische Medien', 660, '119', 1, 80);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (82, 1, 'Reisespesen, Kundenbetreuung', 664, '120', 1, 80);
INSERT INTO fin_account_category (id, companyId, name, code, externId, isActive, parentAccountCategoryId) VALUES (83, 1, 'WB Anlagevermögen', 680, '121', 1, 22);`.split('\n')
         for(let i = 0; i <cmds.length;i++) await queryRunner.query(cmds[i])
     }

    async taxes(queryRunner,companyId){
       const cmds = `INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 1, 1, 3, 'UEX', 'none', 0, 'UEX - Export/Exempt 0.00%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 2, 2, 4, 'ULA', 'none', 0, 'ULA - Leistungen im Ausland 0.00%', 2022, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 3, 3, 5, 'MEL', 'none', 0, 'MEL - Transfer by reporting procedure 0.00%', 2022, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 4, 4, 6, 'UNO', 'none', 0, 'UNO - Exempt revenue  0.00%', 2022, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 5, 5, 7, 'VIM', 'none', 0, 'VIM - Import 0.00%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 6, 6, 8, 'VM25', 'none', 2.5, 'VM25 - Mat/SV (NS) 2.50%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 7, 7, 9, 'ZOLLM', 'none', 100, 'ZOLLM - Import Mat/SV 100.00%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 8, 8, 10, 'VSF', 'none', 0, 'VSF - Free of pretax 0.00%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 9, 9, 11, 'ZOLLB', 'none', 100, 'ZOLLB - Import Inv/BA 100.00%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 10, 10, 12, 'VB25', 'none', 2.5, 'VB25 - Inv/BA (RS) 2.50%', 2022, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 11, 11, 13, 'SUB', 'none', 0, 'SUB - Subsidies, Visitor''s tax, Disposal 0.00%', 2022, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 12, 12, 14, 'SPE', 'none', 0, 'SPE - Donations, Dividends, Compensation 0.00%', 2022, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 13, 13, 15, 'UO77', 'none', 7.7, 'UO77 - Opted revenue 7.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 14, 14, 16, 'UN77', 'none', 7.7, 'UN77 - Revenue (NS) 7.70%', 2017, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 15, 15, 17, 'UR25', 'none', 2.5, 'UR25 - Revenue (RS) 2.50%', 2017, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 16, 16, 18, 'US37', 'none', 3.7, 'US37 - Revenue (SS) 3.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 17, 17, 19, 'BZM77', 'none', 7.7, 'BZM77 - Service import tax Mat/SV 7.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 18, 18, 20, 'BZB77', 'none', 7.7, 'BZB77 - Service import tax Inv/BA 7.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 19, 19, 21, 'VM37', 'none', 3.7, 'VM37 - Mat/SV (SS) 3.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 20, 20, 22, 'VM77', 'none', 7.7, 'VM77 - Mat/SV (NS) 7.70%', 2017, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 21, 21, 23, 'VB37', 'none', 3.7, 'VB37 - Inv/BA (SS) 3.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 22, 22, 24, 'VB77', 'none', 7.7, 'VB77 - Inv/BA (NS) 7.70%', 2017, null, 1);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 23, 23, 25, 'VES', 'none', 7.7, 'VES - Deduction of input VAT 7.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 24, 24, 26, 'VEV', 'none', 7.7, 'VEV - Compensation personal use 7.70%', 2017, null, 0);
INSERT INTO fin_account_tax (companyId, id, taxId, externId, code, type, value, name, startYear, endYear, isActive) VALUES (${companyId}, 25, 25, 27, 'VKÜ', 'none', 7.7, 'VKÜ - pre-tax reduction 7.70%', 2017, null, 0);`.split('\n')
        for(let i = 0; i <cmds.length;i++) await queryRunner.query(cmds[i])
    }
    
    async accounts(queryRunner,companyId){
       const cmds = `INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 1, 1, 'Saldoübernahme', '89', null, 5, 9901, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 2, 2, 'Korrekturen', '90', null, 5, 9900, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 3, 3, 'Jahresgewinn oder Jahresverlust', '91', null, 5, 9200, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 4, 4, 'Schlussbilanz', '92', null, 5, 9101, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 5, 5, 'Eröffnungsbilanz', '93', null, 5, 9100, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 6, 6, 'Erfolgsrechnung', '94', null, 5, 9000, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 7, 7, 'Währungsgewinne', '95', null, 1, 6999, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 8, 8, 'Währungsverluste', '96', null, 2, 6949, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 9, 9, 'Rundungsdifferenz', '97', null, 2, 6945, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 10, 10, 'Skonti', '98', null, 2, 4900, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 11, 11, 'Einkauf Handelsware', '99', null, 2, 4200, 0, null, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 12, 12, 'Skonti', '100', null, 1, 3800, 0, 12, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 13, 13, 'Handelserlös', '101', null, 1, 3200, 0, 14, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 14, 14, 'Bezugsteuer', '102', null, 4, 2203, 0, 8, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 15, 15, 'Umsatzsteuerausgleich Abrechnungsmethode', '103', null, 4, 2202, 0, 8, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 16, 16, 'Abrechnungskonto MWST', '104', null, 4, 2201, 0, 8, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 17, 17, 'Geschuldete Mehrwertsteuer (Umsatzsteuer)', '105', null, 4, 2200, 0, 8, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 18, 18, 'Erhaltene Anzahlungen von Dritten', '106', null, 4, 2030, 0, 9, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 19, 19, 'Verbindlichkeiten Material- / Warenaufwand', '107', null, 4, 2000, 0, 9, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 20, 20, 'Vorsteuerkorrektur', '108', null, 3, 1174, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 21, 21, 'Vorsteuerkürzung', '109', null, 3, 1173, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 22, 22, 'Vorsteuerausgleich Abrechnungsmethode', '110', null, 3, 1172, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 23, 23, 'Vorsteuer Inv., übr. Betriebsaufwand Kl.1 5-8', '111', null, 3, 1171, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 24, 24, 'Vorsteuer Material, Waren, DL - Kl. 4', '112', null, 3, 1170, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 25, 25, 'Forderungen aus Lieferungen und Leistungen', '113', null, 3, 1100, 0, 4, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 26, 26, 'Bank', '114', null, 3, 1029, 0, 5, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 27, 27, 'PostFinance', '115', null, 3, 1020, 0, 5, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 28, 28, 'Transferkonto', '116', null, 3, 1090, 0, 33, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 29, 29, 'Lohndurchlaufkonto', '117', null, 3, 1091, 0, 33, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 30, 30, 'Wertberichtigung Forderungen', '118', null, 3, 1109, 0, 4, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 31, 31, 'Vorauszahlungen an Lieferanten', '119', null, 3, 1130, 0, 4, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 32, 32, 'Abrechnungskonto MWST', '120', null, 3, 1175, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 33, 33, 'Verrechnungssteuer', '121', null, 3, 1176, 0, 3, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 34, 34, 'Kontokorrent Unfallversicherung', '122', null, 3, 1183, 0, 34, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 35, 35, 'Kontokorrent Krankentaggeldversicherung', '123', null, 3, 1184, 0, 34, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 36, 36, 'Kontokorrent Quellensteuer', '124', null, 3, 1188, 0, 34, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 37, 37, 'Lager Handelsware', '125', null, 3, 1200, 0, 35, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 38, 38, 'Nicht fakturierte Dienstleistungen', '126', null, 3, 1280, 0, 35, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 39, 39, 'Bezahlter Aufwand des Folgejahres', '127', null, 3, 1300, 0, 36, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 40, 40, 'Maschinen und Apparate', '128', null, 3, 1500, 0, 32, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 41, 41, 'Mobiliar und Einrichtungen', '129', null, 3, 1510, 0, 32, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 42, 42, 'Informatik', '130', null, 3, 1520, 0, 32, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 43, 43, 'Fahrzeuge', '131', null, 3, 1530, 0, 32, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 44, 44, 'Kreditkarte', '132', null, 4, 2190, 0, 37, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 45, 45, 'Kontokorrent Vorsorgeeinrichtung', '133', null, 4, 2270, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 46, 46, 'Kontokorrent AHV, IV, EO, ALV', '134', null, 4, 2271, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 47, 47, 'Kontokorrent FAK', '135', null, 4, 2272, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 48, 48, 'Kontokorrent Unfallversicherung', '136', null, 4, 2273, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 49, 49, 'Kontokorrent Krankentaggeld', '137', null, 4, 2274, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 50, 50, 'Kontokorrent Quellensteuer', '138', null, 4, 2279, 0, 38, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 51, 51, 'Passive Rechnungsabgrenzungen', '139', null, 4, 2300, 0, 39, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 52, 52, 'Darlehen', '140', null, 4, 2400, 0, 41, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 53, 53, 'Eigenkapital zu Beginn des Geschäftsjahrs', '141', null, 4, 2800, 0, 43, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 54, 54, 'Kapitaleinlagen und Kapitalrückzüge', '142', null, 4, 2820, 0, 44, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 55, 55, 'Privatkonto', '143', null, 4, 2850, 0, 45, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 56, 56, 'Jahresgewinn oder Jahresverlust', '144', null, 4, 2891, 0, 46, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 57, 57, 'Dienstleistungserlös', '145', null, 1, 3400, 0, 48, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 58, 58, 'Nebenerlös Lieferungen und Leistungen', '146', null, 1, 3600, 0, 50, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 59, 59, 'Verluste / Wertberichtigung Forderungen', '147', null, 1, 3805, 0, 12, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 60, 60, 'Kursdifferenzen', '148', null, 1, 3806, 0, 12, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 61, 61, 'Bestandsänderungen nicht fakturierte Dienstleistungen', '149', null, 1, 3940, 0, 52, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 62, 62, 'Materialeinkauf Erzeugnis', '150', null, 2, 4000, 0, 53, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 63, 63, 'Einkauf Dienstleistungen', '151', null, 2, 4400, 0, 55, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 64, 64, 'Kursdifferenzen', '152', null, 2, 4906, 0, 17, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 65, 65, 'Löhne', '153', null, 2, 5000, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 66, 66, 'Zulagen', '154', null, 2, 5001, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 67, 67, 'Erfolgsbeteiligungen', '155', null, 2, 5002, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 68, 68, 'Provisionen', '156', null, 2, 5003, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 69, 69, 'Leistungen von Sozialversicherungen', '157', null, 2, 5005, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 70, 70, 'Übriger Personalaufwand', '158', null, 2, 5008, 0, 57, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 71, 71, 'AHV, IV, EO, ALV', '159', null, 2, 5700, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 72, 72, 'FAK', '160', null, 2, 5710, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 73, 73, 'Vorsorgeeinrichtungen', '161', null, 2, 5720, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 74, 74, 'Unfallversicherung', '162', null, 2, 5730, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 75, 75, 'Krankentaggeldversicherung', '163', null, 2, 5740, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 76, 76, 'Quellensteuer', '164', null, 2, 5790, 0, 59, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 77, 77, 'Aus- und Weiterbildung', '165', null, 2, 5810, 0, 61, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 78, 78, 'Spesenentschädigung effektiv', '166', null, 2, 5820, 0, 62, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 79, 79, 'Spesen, Reise, Auto, Übernachtung', '167', null, 2, 5832, 0, 63, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 80, 80, 'Personalanlässe', '168', null, 2, 5880, 0, 64, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 81, 81, 'Privatanteile Personalaufwand', '169', null, 2, 5890, 0, 65, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 82, 82, 'Ausgleich Naturalleistungen', '170', null, 2, 5891, 0, 65, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 83, 83, 'Miete', '171', null, 2, 6000, 0, 67, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 84, 84, 'Reinigung', '172', null, 2, 6040, 0, 67, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 85, 85, 'URE Maschinen und Einrichtungen', '173', null, 2, 6100, 0, 69, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 86, 86, 'Reparaturen', '174', null, 2, 6200, 0, 71, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 87, 87, 'Betriebsstoffe', '175', null, 2, 6210, 0, 71, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 88, 88, 'Fahrzeugversicherung und Abgaben', '176', null, 2, 6220, 0, 71, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 89, 89, 'Fahrzeugleasing', '177', null, 2, 6260, 0, 71, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 90, 90, 'Privatanteile Fahrzeugaufwand', '178', null, 2, 6270, 0, 71, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 91, 91, 'Sachversicherungen', '179', null, 2, 6300, 0, 73, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 92, 92, 'Abgaben, Gebühren, Bewilligungen', '180', null, 2, 6360, 0, 74, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 93, 93, 'Energie- und Entsorgungsaufwand', '181', null, 2, 6400, 0, 76, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 94, 94, 'Büromaterial', '182', null, 2, 6500, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 95, 95, 'Kommunikationskosten', '183', null, 2, 6510, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 96, 96, 'Internet', '184', null, 2, 6512, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 97, 97, 'Porti', '185', null, 2, 6513, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 98, 98, 'Buchführung', '186', null, 2, 6530, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 99, 99, 'Sonstiger Verwaltungsaufwand', '187', null, 2, 6559, 0, 78, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 100, 100, 'Informatikaufwand', '188', null, 2, 6570, 0, 79, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 101, 101, 'Werbeinserate, elektronische Medien', '189', null, 2, 6600, 0, 81, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 102, 102, 'Reisespesen', '190', null, 2, 6640, 0, 82, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 103, 103, 'Kundenbetreuung', '191', null, 2, 6641, 0, 82, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 104, 104, 'Abschreibung / WB Anlagevermögen', '192', null, 2, 6800, 0, 83, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 105, 105, 'Zinsaufwand', '193', null, 2, 6900, 0, 25, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 106, 106, 'Bankspesen', '194', null, 2, 6940, 0, 25, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 107, 107, 'Erträge aus Bankguthaben', '195', null, 1, 6950, 0, 24, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 108, 108, 'Betriebsfremder a.o. Aufwand', '196', null, 2, 8000, 0, 27, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 109, 109, 'Betriebsfremder a.o. Ertrag', '197', null, 1, 8100, 0, 27, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 110, 110, 'A.o. Verluste von Forderungen', '198', null, 2, 8505, 0, 28, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 111, 111, 'A.o. Gewinne Veräusserung Anlagevermögen', '199', null, 1, 8514, 0, 28, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 112, 112, 'Domain (SLA)', '200', null, 1, 3201, 0, 14, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 113, 113, 'Hosting (SLA)', '201', null, 1, 3202, 0, 14, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 114, 114, 'Software (SLA)', '202', null, 1, 3203, 0, 14, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 115, 115, 'Eink. Domain', '203', null, 2, 4201, 0, 19, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId) VALUES (${companyId}, 116, 116, 'Bruttoerlöse Hosting', '204', null, 1, 3205, 0, 14, null);
INSERT INTO fin_account (companyId, id, accountId, name, externId, color, type, code, isActive, accountCategoryId, taxId, showInCashSystem) VALUES (${companyId}, 119, 117, 'Kasse', null, null, 3, 1000, 1, 5, null, 1);`.split('\n')
        for(let i = 0; i < cmds.length; i++) await queryRunner.query(cmds[i])
    }

    async down(queryRunner) {
    }
}
        