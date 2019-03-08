function promise(executor) {
    var self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallBack = []
    self.onRejectedCallBack = []

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value
            for (let value of self.onResolvedCallBack.values()) {
              value(value)
            }
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = reason
            for (let value of self.onRejectedCallBack.values()) {
              value(value)
            }
        }
    }
    try {
        executor(resolve, rejected)
    } catch (error) {
        reject(error)
    }
    
}
Promise.prototype.then = function (onResolved, onRejected) {
    var self = this
    var promise2

    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {throw reason}

    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject){
            try {
                var x = onResolved(self.data)
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                }
                resolve(x)
            } catch (error) {
                reject(error)
            }
        })
    }
    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject){
            try {
                var x = onRejected(self.data)
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                }
                reject(x)
            } catch (error) {
                reject(error)
            }
        })
    }
    if (self.status === 'pending') {
        return promise2 = new Promise(function(resolve, reject){
            self.onResolvedCallback.push(function(value) {
                try {
                  var x = onResolved(self.data)
                  if (x instanceof Promise) {
                    x.then(resolve, reject)
                  }
                } catch (e) {
                  reject(e)
                }
              })
        
              self.onRejectedCallback.push(function(reason) {
                try {
                  var x = onRejected(self.data)
                  if (x instanceof Promise) {
                    x.then(resolve, reject)
                  }
                } catch (e) {
                  reject(e)
                }
              })
        })
    }
}
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
  }

  Promise.deferred = Promise.defer = function() {
    var dfd = {}
    dfd.promise = new Promise(function(resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }