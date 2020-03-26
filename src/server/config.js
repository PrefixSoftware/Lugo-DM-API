// ================================================
//
// Modules
//
// ================================================

const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const helmet = require('helmet');

// const routes = require ('../routes/');

module.exports = app=>{

  // ================================================
  //
  // Middlewares
  //
  // ================================================

  app.use(helmet());

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride('_method'));
  app.use(bodyParser.json());

  app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if(req.method === 'OPTIONS'){
            req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    //ROUTES
    // routes(app);

    // catch 404 and forward to error handler
    app.use((req,res,next)=>{
        app.locals.tkn = req.tkn;
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    // error handlers

// development error handler
// will print stacktrace


  if('development' === app.get('env')){
    app.use(errorHandler);
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
  }


  // production error handler
// no stacktraces leaked to user
    app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        res.json({
            message:error.message
        })
    })

    //error handlerbars


    return app;
}
