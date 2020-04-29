import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
// import { DateTime } from 'luxon'
import { Pkt, AddrLink } from '../CommonComps/CommonComps'

const ListCont = styled.div`
padding: 1rem;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0.5rem;
  ${({ head }) => head && css`font-weight: 700;`}
  :nth-child(2n + 2) {
    background-color: ${({ theme }) => theme.colors.pktGreyLight};
  }
`
const CandCont = styled.span`
  display: inline-block;
  padding: 0.5rem;
  word-break: break-all;
`

const Candidate = ({ data, addr }) => {
  return <Row>
    <div>{data.candidate === addr
      ? <CandCont>{addr}</CandCont>
      : <AddrLink to={`/address/${data.candidate}`}>{data.candidate}</AddrLink>}</div>
    <div><Pkt amt={data.votesFor}/></div>
  </Row>
  // return <div>{data[0]} {data[1]}</div>
}

function CandidateList ({ dData, addr }) {
  return <ListCont>
    <Row head>
      <div>Candidate</div>
      <div>Votes</div>
    </Row>
    {dData.map((data, i) => <Candidate data={data} key={`dataRow-${i}`} addr={addr}/>)}
  </ListCont>
}

CandidateList.propTypes = {
  dData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  addr: PropTypes.string
}

CandidateList.defaultProps = {

}

export default CandidateList
