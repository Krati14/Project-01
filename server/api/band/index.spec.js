'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bandCtrlStub = {
  index: 'bandCtrl.index',
  show: 'bandCtrl.show',
  create: 'bandCtrl.create',
  update: 'bandCtrl.update',
  destroy: 'bandCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bandIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './band.controller': bandCtrlStub
});

describe('band API Router:', function() {

  it('should return an express router instance', function() {
    bandIndex.should.equal(routerStub);
  });

  describe('GET /api/bands', function() {

    it('should route to band.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bandCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bands/:id', function() {

    it('should route to band.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bandCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bands', function() {

    it('should route to band.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bandCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bands/:id', function() {

    it('should route to band.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bandCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bands/:id', function() {

    it('should route to band.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bandCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bands/:id', function() {

    it('should route to band.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bandCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
