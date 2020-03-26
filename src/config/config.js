'use strict';

// ================================================
//
// Port
//
// ================================================

process.env.PORT = process.env.PORT || 3000;

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

process.env.TOKEN_SEED = process.env.TOKEN_SEED || '(A22@`_?EsCWkb?:JQxfDLu';

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
