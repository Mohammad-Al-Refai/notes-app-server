const ResponseFactory = {
  fall: (res, data) => {
    res.status(400).send({ state: false, result: data })
  },
  success: (res, data) => {
    res.status(200).send({ state: true, result: data })
  },
  notFound: (res, data) => {
    res.status(404).send({ state: false, result: data })
  },
  unauthorized: (res, data) => {
    res.status(401).send({ state: false, result: data })
  },
}

module.exports = { ResponseFactory }
