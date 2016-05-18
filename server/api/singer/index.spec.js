'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var singerCtrlStub = {
  index: 'singerCtrl.index',
  show: 'singerCtrl.show',
  create: 'singerCtrl.create',
  update: 'singerCtrl.update',
  destroy: 'singerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var singerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './singer.controller': singerCtrlStub
});

describe('singer API Router:', function() {

  it('should return an express router instance', function() {
    singerIndex.should.equal(routerStub);
  });

  describe('GET /api/singers', function() {

    it('should route to singer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'singerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/singers/:id', function() {

    it('should route to singer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'singerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/singers', function() {

    it('should route to singer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'singerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/singers/:id', function() {

    it('should route to singer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'singerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/singers/:id', function() {

    it('should route to singer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'singerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/singers/:id', function() {

    it('should route to singer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'singerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
