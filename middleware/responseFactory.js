const ResponseFactory = {
  fall: (res, data) => {
    res.status(400).send({ result: data })
  },
  success: (res, data) => {
    res.status(200).send({ result: data })
  },
  notFound: (res, data) => {
    res.status(404).send({ result: data })
  },
  unauthorized: (res, data) => {
    res.status(401).send({ result: data })
  },
}

module.exports = { ResponseFactory }
