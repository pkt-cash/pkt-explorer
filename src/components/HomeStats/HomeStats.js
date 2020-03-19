import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  ListLabelCont,
  ListCont,
  TitleCont,
  LeftCont,
  TitleHeader,
  ListLabel,
  Pkt
} from '../CommonComps/CommonComps'
import { Row, Column, ItemCont, Label, BrdCont, Content } from '../BlockStats/BlockStats'
import metrics, { mqs } from '../../theme/metrics'
import DiffChart from '../DiffChart/DiffChart'
import Loader from '../Loader/Loader'
import Tooltip from '../Tooltip/Tooltip'
import { bpsStr, commafy } from '../../utils'

const ListDataCont = styled.div`
  padding: ${metrics.padding}rem;
  /* display: flex;
  @media ${mqs.small} {
    flex-direction: column;
  } */
  /* @media all and (max-width: 500px) {
    flex-direction: column;
  } */
`
const StatsCont = styled.div`
  flex:2;
  /* border-right: 1px solid ${({ theme }) => theme.colors.pktGreyLight}; */
  padding-right: ${metrics.padding}rem;
  margin-right: ${metrics.padding}rem;
  display: flex;
  flex-flow: column nowrap;
  @media ${mqs.small} {
    border-right-width: 0;
    margin-right: 0;
    padding-right: 0;
  }
`

const ChartCont = styled.div`
  @media ${mqs.small} {
    text-align: center;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
`

const BallEmoji = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  padding-right: 1em;
  margin-right: 0.3em;
  &::before { content:""; }
`
const BandwidthEmoji = styled(BallEmoji)`
  background-color: #4ab5eb;
`
const EPSEmoji = styled(BallEmoji)`
  background-color: #fc6868;
`

const HomeStats = ({ blockList, txData, statsCoins }) => {
  return (<>
    <TitleCont>
      <LeftCont>
        <TitleHeader>
          PKT Blockchain
        </TitleHeader>
      </LeftCont>
    </TitleCont>
    <ListCont>
      <ListLabelCont>
        <ListLabel>Stats</ListLabel>
      </ListLabelCont>
      {txData && txData.length
        ? <ListDataCont>
          <ChartCont>
            <DiffChart txData={txData} />
          </ChartCont>
          <ListCont>
            <Row>
              <Column>
                <ItemCont>
                  <p><Label>
                    <BandwidthEmoji/>Network Bandwidth
                    <Tooltip>
                      An estimate of the amount of bandwidth currently being consumed
                      for mining. This estimate is based on the number of announcements
                      per block and the difference between the most valuable (newest)
                      announcements and the least valuable (oldest). Since announcements
                      can be re-used in multiple blocks, this estimate is not exact.
                    </Tooltip>
                  </Label> <Content>{bpsStr(txData[0].data[0][1])}</Content></p>
                </ItemCont>
              </Column>
              <Column>
                <ItemCont>
                  <p><Label>
                    <EPSEmoji/>Encryptions Per Second
                    <Tooltip>
                      This is the sum of the estimated encryptions per second expended
                      by the announcement miners to mine the blocks plus the encryptions
                      per second expended by the block miners. Since announcements can
                      be re-used in multiple blocks, this estimate is not exact.
                    </Tooltip>
                  </Label> <Content>{commafy(txData[1].data[0][1])}</Content></p>
                </ItemCont>
              </Column>
            </Row>
            <Row>
              <Column>
                <ItemCont>
                <BrdCont>
                  <p><Label>
                    Difficulty
                    <Tooltip>
                      This is the global difficulty of the blockchain, it is a unitless
                      number but every time it doubles, it means there is twice as much
                      announcement mining power, twice as much block mining power, twice
                      as much bandwidth between announcement miners and block miners, or
                      some combination of the three.
                    </Tooltip>
                  </Label> <Content>
                    {blockList ?
                      commafy(Math.floor(blockList[0].difficulty)) :
                      ''
                    }
                    </Content></p>
                    </BrdCont>
                </ItemCont>
              </Column>
              <Column>
                <ItemCont>
                  <BrdCont>
                  <p><Label>
                    Mined To Date
                    <Tooltip>
                      How many coins have already been mined.
                    </Tooltip>
                  </Label> <Content>
                    {statsCoins ?
                      <Pkt amt={statsCoins.alreadyMined}/> :
                      ''
                    }
                    </Content></p>
                    </BrdCont>
                </ItemCont>
              </Column>
            </Row>
            <Row>
              <Column>
                <ItemCont>
                  <BrdCont>
                  <p><Label>
                    Current Block Reward
                    <Tooltip>
                      How many new coins are paid out in each block.
                    </Tooltip>
                  </Label> <Content>
                    {statsCoins ?
                      <Pkt amt={statsCoins.reward}/> :
                      ''
                    }</Content></p>
                  </BrdCont>
                </ItemCont>
              </Column>
              <Column>
                <ItemCont>
                  <BrdCont>
                    <p><Label>
                      Coins Remaining
                      <Tooltip>
                        How many coins remain to be mined.
                      </Tooltip>
                    </Label> <Content>
                    {statsCoins ?
                      <Pkt amt={statsCoins.remaining}/> :
                      ''
                    }
                      </Content></p>
                  </BrdCont>
                </ItemCont>
              </Column>
            </Row>
          </ListCont>
        </ListDataCont>
        : <Loader text='Loading...' small />}
      <StatsCont>
      </StatsCont>
    </ListCont>
  </>)
}

HomeStats.propTypes = {
  txData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  labelY: PropTypes.string
  // lastBlock: PropTypes.number.isRequired
}

// HomeStats.defaultProps = {

// }

export default HomeStats
