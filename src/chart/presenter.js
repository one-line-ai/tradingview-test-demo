import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    width: 100vw;
    margin-top: 12px;
`;

const ChartContainer = styled.div`
    width: 70%;
    max-width: 700px;
    height: 500px;
`;

const ChartNavigations = styled.div`
    width: 100%;
    display: flex;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-right: 8px;
    border: 1px solid;
    padding: 4px;
    height: 30px;

    ${({title}) => title ? `
        &::before {
            content: '${title}';
            margin-right: 4px;
        }
    ` : ''}
`;

const Button = styled.button`
    height: 20px;
`;

const ChartCanvas = styled.div`
    height: calc(100% - 30px);
    position: relative;
`;

const Loading = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const RightContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    max-width: 300px;
`;

const SymbolsContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
`;

const SymbolAddButton = styled.button`
    width: 50px;
    height: 50px;
    ${({disabled}) => disabled ? `
        pointer-events: none;
        opacity: 0.7;
    ` : ''}
`;

const CompareContainer = styled.div``;
const CompareSymbols = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CompareSymbolLine = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
`;

const VisibleButton = styled.button`
    width: 60px;
    height: 20px;
    margin-left: 12px;
`;

const HighlightButton = styled(VisibleButton)`
    width: 70px;
`;

const RemoveButton = styled.button`
    width: 40px;
    height: 20px;
    margin-left: 12px;
`;

const TooltipContainer = styled.div`
    background: rgba(0,0,0,0.3);
    width: 220px;
    padding: 4px;
    display: none;
    border-radius: 4px;
    position: absolute;
    top: 10px;
    left: 0px;
    z-index: 10;
    pointer-events: none;
`;

const TooltipItem = styled.div`
    width: 100%;
    color: black;

    ${({color,removed}) => `
        color: ${color};
        display: ${removed ? 'none' : 'flex'};
    `}
`;

const LineTooltipContainer = styled.div`
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    pointer-events: none;
`;

const LineTooltipItem = styled.div`
    width: 60px;
    height: 10px;
    position: absolute;
    top: 0px;
    left: 0px;

    ${({color,removed,visible}) => `
        color: ${color};
        display: ${(removed || !visible) ? 'none' : 'block'};
    `}
`;


const Presenter = ({
    setRef,
    setTooltipRef,
    setLineTooltipCanvasRef,
    ranges,
    intervals,
    state: {
        symbol,
        symbols,
        loading,
        charts,
        mouseOut
    },
    onAddSymbolClick,
    onRemoveSymbolClick,
    onResetClick,
    onRangeClick,
    onIntervalClick,
    onVisibleClick,
    onHighlightClick
 }) => {
    const compares = charts.filter((d) => !d.removed);
    const comparedSymbols = charts.map(({symbol: s}) => s);

    return (
        <Container>
            <ChartContainer>
                <ChartNavigations>
                    <ButtonContainer>
                        <Button onClick={onResetClick}>Reset</Button>
                    </ButtonContainer>
                    <ButtonContainer title={'range'}>
                    {
                        ranges.map(({text,value,sub},i) => <Button key={'r'+i} onClick={onRangeClick({value,sub})}>{text}</Button>)
                    }
                    </ButtonContainer>
                    <ButtonContainer title={'interval'}>
                    {
                        intervals.map(({text,value,sub,barSpacing},j) => <Button key={'i'+j} onClick={onIntervalClick({value,sub,barSpacing})}>{text}</Button>)
                    }
                    </ButtonContainer>
                </ChartNavigations>
                <ChartCanvas id='chart-canvas' ref={setRef}>
                    {
                        loading ? <Loading>loading...</Loading> : null
                    }
                    <TooltipContainer ref={setTooltipRef}>
                        {
                            charts.map((d,i) => <TooltipItem text={d.symbol} removed={d.removed} color={d.color} key={'tti'+i}/>)
                        }
                    </TooltipContainer>
                    <LineTooltipContainer ref={setLineTooltipCanvasRef}>
                        {
                            charts.map((d,i) => <LineTooltipItem text={d.symbol} removed={d.removed} color={d.color} key={'ttti'+i} visible={d.visible}/>)
                        }
                    </LineTooltipContainer>
                </ChartCanvas>
            </ChartContainer>
            <RightContainer>
                symbol 추가
                <SymbolsContainer>
                {
                    symbols.map((d,i) => (
                        <SymbolAddButton 
                            disabled={comparedSymbols.includes(d)}
                            onClick={onAddSymbolClick(d)}
                            key={`sab`+i}
                        >
                            {d}
                        </SymbolAddButton>
                    ))
                }
                </SymbolsContainer>
                <CompareContainer>
                    Symbol Compare
                    <CompareSymbols>
                    {
                        compares.map((d,i) => 
                            <CompareSymbolLine style={{color: d.color}} key={`csl`+i}>
                                <div style={{width: '50px'}}>{d.symbol}</div>
                                {
                                    <RemoveButton onClick={onRemoveSymbolClick(d.symbol)} style={{visibility: d.symbol !== symbol ? 'visible' : 'hidden'}}>삭제</RemoveButton>
                                }
                                <VisibleButton onClick={onVisibleClick(d.symbol)}>{d.visible ? '숨기기' : '보기'}</VisibleButton>
                                <HighlightButton onClick={onHighlightClick(d.symbol)}>{d.hightlight ? '강조취소' : '강조하기'}</HighlightButton>
                            </CompareSymbolLine>
                        )
                    }
                    </CompareSymbols>
                </CompareContainer>
            </RightContainer>
        </Container>
    )
 };

 export default Presenter;