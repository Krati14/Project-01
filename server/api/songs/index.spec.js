'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var songsCtrlStub = {
  index: 'songsCtrl.index',
  show: 'songsCtrl.show',
  create: 'songsCtrl.create',
  update: 'songsCtrl.update',
  destroy: 'songsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var songsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './songs.controller': songsCtrlStub
});

describe('songs API Router:', function() {

  it('should return an express router instance', function() {
    songsIndex.should.equal(routerStub);
  });

  describe('GET /api/songss', function() {

    it('should route to songs.controller.index', function() {
      routerStub.get
        .withArgs('/', 'songsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/songss/:id', function() {

    it('should route to songs.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'songsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/songss', function() {

    it('should route to songs.controller.create', function() {
      routerStub.post
        .withArgs('/', 'songsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/songss/:id', function() {

    it('should route to songs.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'songsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/songss/:id', function() {

    it('should route to songs.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'songsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/songss/:id', function() {

    it('should route to songs.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'songsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
