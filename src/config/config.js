'use strict';

// ================================================
//
// Port
//
// ================================================

process.env.PORT = process.env.PORT || 3020;

// ================================================
//
// Token Expiry Date
//
// ================================================

process.env.ERP_TOKEN_EXPIRY_DATE = process.env.ERP_TOKEN_EXPIRY_DATE || '8h';
process.env.PUBLIC_TOKEN_EXPIRY_DATE = process.env.PUBLIC_TOKEN_EXPIRY_DATE || '30d';

// ================================================
//
// Token Seed
//
// ================================================

process.env.seed = process.env.seed || '3acef59cad87e9c310b6ad6a2def1accde23894d2b639c1027093e9e8b64eed8';

// ================================================
//
// Production or develop
//
// ================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// ================================================
//
// TOKEN iPad
//
// ================================================

process.env.TOKEN_iPad = process.env.TOKEN_iPad || '19244b8aa3c4022b355be1db037f7e657230d07032dec64f76e545b56117aac2';
