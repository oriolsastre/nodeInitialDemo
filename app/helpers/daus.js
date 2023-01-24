const tirarDaus = () => {
    const dau1 = Math.ceil(Math.random()*6)
    const dau2 = Math.ceil(Math.random()*6)
    const victoria = dau1+dau2===7
    return {dau1, dau2, victoria}
}

module.exports = tirarDaus;