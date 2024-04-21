/*___Player Mode Chosen___*/
let PlayerVsPlayer = document.getElementById('PlayerVsPlayer');
PlayerVsPlayer.addEventListener('click', P1VsP2);

let PlayerVsComputer = document.getElementById('PlayerVsComputer');
PlayerVsComputer.addEventListener('click', P1vsC);

function P1VsP2() {
    document.getElementById('PlayerModePage').classList.add('hide');
    /*__Info Button___*/

    let InfoButton = document.getElementById('InfoButton')
    let InfoDetail = document.getElementById('MainInfoDetail')

    InfoButton.addEventListener('click', () => {
        InfoDetail.classList.toggle("hide")
        InfoButton.classList.add('hide')
    })

    InfoDetail.addEventListener('click', () => {
        InfoDetail.classList.toggle("hide")
        InfoButton.classList.remove('hide')
    })

    /*___Hover Effect___ &&____Click Effect____*/


    let Turn = 1;
    let XWinCount = 0;
    let OWinCount = 0;
    let TieCount = 0;
    let IsHover = [true, true, true, true, true, true, true, true, true, true]

    let WiningProbability = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [3, 6, 9], [2, 5, 8]]
    let XWinningCondition = [];
    let OWinningCondition = [];


    for (let i = 1; i <= 9; i++) {
        document.getElementById(`fb${i}`).addEventListener('mouseenter', () => {
            if (Turn && IsHover[i]) {
                document.getElementById(`b${i}`).innerHTML = `<span class="material-symbols-outlined opacity"id="XSymbol${i}">
                close
                </span>`
            }
            else {
                if (IsHover[i])
                    document.getElementById(`b${i}`).innerHTML = `<span class="material-symbols-outlined opacity" id="OSymbol${i}">
                    trip_origin
                    </span>`
            }
        }, false)

        if (IsHover[i]) {
            document.getElementById(`fb${i}`).addEventListener('mouseleave', () => {
                document.getElementById(`b${i}`).innerHTML = ""
            }, false)
        }

        document.getElementById(`fb${i}`).addEventListener('click', () => {
            IsHover[i] = false
            if (Turn) {
                document.getElementById(`fb${i}`).innerHTML = `<span class="material-symbols-outlined"id="XSymbol${i}">
                close
                </span>`
                XWinningCondition.push(i)
                document.getElementById('TurnIconChange').innerHTML = 'trip_origin'
                Turn = 0
            }
            else {
                document.getElementById(`fb${i}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${i}">
                trip_origin
                </span>`
                OWinningCondition.push(i)
                document.getElementById('TurnIconChange').innerHTML = 'close'
                Turn = 1
            }
            CheckWin(XWinningCondition, OWinningCondition, IsHover);
        }, false)
    }

    /*____Check Winning____*/

    function CheckWin(X, O, Tie) {
        let WinBelongs = [];
        if (X.length >= 3 || O.length >= 3) {
            WiningProbability.forEach((probability) => {
                if (!Turn) {
                    for (let i = 0; i < X.length; i++) {
                        if (X.indexOf(probability[i]) > -1) {
                            WinBelongs.push(probability[i])
                        }
                    }
                    let a = probability.toString();
                    let b = WinBelongs.sort();

                    if (b.toString() == a) {
                        XWinCount = XWinCount + 1;
                        XWinner(WinBelongs);
                    }
                    else {
                        WinBelongs = [];
                    }
                }
                else {
                    for (let i = 0; i < O.length; i++) {
                        if (O.indexOf(probability[i]) > -1) {
                            WinBelongs.push(probability[i])
                        }
                    }
                    let a = probability.toString();
                    let b = WinBelongs.sort();

                    if (b.toString() == a) {
                        OWinCount = OWinCount + 1;
                        OWinner(WinBelongs);
                    }
                    else {
                        WinBelongs = [];
                    }
                }

            })
            let count = 0
            console.log(Tie);
            for (let i = 1; i <= 9; i++) {
                if (Tie[i] == false) {
                    count++;
                }
            }
            if (count == Tie.length - 1) {
                MatchTie(WinBelongs);
                return 0;
            }
        }
    }

    function MatchTie(HighlightIndex) {
        document.getElementById('WhoWin').innerHTML = 'MATCH TIE!'
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('TakesRoundOrTieText').innerHTML = "NO ONE TAKES ROUND"
        document.getElementById('WinIcon').innerHTML = "";
        document.getElementById('TakesRoundOrTieText').style.color = "#A8BEC9"
        WinBoxLeftColor(HighlightIndex)
        WinBelongs = [];
        TieCount = TieCount + 1;
        document.getElementById('TieCount').innerHTML = TieCount
    }

    /*____Change Color After Winning____*/

    let number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    function XWinner(HighlightIndex) {
        HighlightIndex.forEach((x) => {
            document.getElementById(`b${x}`).style.backgroundColor = '#31C4BE'
            document.getElementById(`XSymbol${x}`).style.color = '#1F3540'
        })
        document.getElementById('WhoWin').innerHTML = 'YOU WIN!'
        document.getElementById('WinIcon').innerHTML = `<span class="material-symbols-outlined"id="XSymbol1">
        close
        </span>`
        document.getElementById('TakesRoundOrTieText').innerHTML = "TAKES THE ROUND"
        document.getElementById('WinBlockText').classList.add('WinColorX');
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('XWinCount').innerHTML = XWinCount
        WinBoxLeftColor(HighlightIndex)
        WinBelongs = [];
    }

    function OWinner(HighlightIndex) {
        HighlightIndex.forEach((x) => {
            document.getElementById(`b${x}`).style.backgroundColor = '#F2B237'
            document.getElementById(`OSymbol${x}`).style.color = '#1F3540'
        })
        document.getElementById('WhoWin').innerHTML = 'OPPONENT WIN!'
        document.getElementById('WinIcon').innerHTML = `<span class="material-symbols-outlined" id="OSymbol1">
        trip_origin
        </span>`
        document.getElementById('TakesRoundOrTieText').innerHTML = "TAKES THE ROUND"
        document.getElementById('WinBlockText').classList.add('WinColorO');
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('OWinCount').innerHTML = OWinCount
        WinBoxLeftColor(HighlightIndex)
        WinBelongs = [];
    }

    function WinBoxLeftColor(l) {
        console.log(l);
        for (let i = 1; i <= 9; i++) {
            if (i != l[0] && i != l[1] && i != l[2]) {
                document.getElementById(`b${i}`).style.backgroundColor = "#0F1A20"
                document.getElementById(`b${i}`).style.boxShadow = "0px 5px #071115"
            }
        }
        document.getElementById('BodyColor').style.backgroundColor = '#0C1319'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#0F1A20'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #071015"
        document.getElementById('XBoxColor').style.backgroundColor = '#19615E'
        document.getElementById('OBoxColor').style.backgroundColor = '#78581B'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#545F65'
        document.getElementById('RefreshBox').style.backgroundColor = '#545F65'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #35444B'
        document.getElementById('InfoButton').style.color = "#545F65"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 2px #31c4bf78,-1px -1px 2px #31c4bf78"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 2px #f2b1378a,-1px -1px 2px #f2b1378a"
    }

    /*____Refresh and Next Round____*/

    let refresh = document.getElementById('RefreshBox').addEventListener('click', () => {
        XWinningCondition = [];
        OWinningCondition = [];
        // XWinCount = 0;
        // OWinCount = 0;
        // TieCount = 0;
        Turn = 1;
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
        }

        document.getElementById('TurnIconChange').innerHTML = 'close'
        document.getElementById('XWinCount').innerHTML = '0';
        document.getElementById('OWinCount').innerHTML = '0';
        document.getElementById('TieCount').innerHTML = '0';
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })

    let ChangeTurn = true;

    let NextRound = document.getElementById('NextRound').addEventListener('click', () => {
        XWinningCondition = [];
        OWinningCondition = [];
        if (ChangeTurn) {
            Turn = 0
            document.getElementById('TurnIconChange').innerHTML = 'trip_origin'
            ChangeTurn = false;
        }
        else {
            Turn = 1
            document.getElementById('TurnIconChange').innerHTML = 'close'
            ChangeTurn = true;
        }
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
            document.getElementById(`b${i}`).style.backgroundColor = '#1F3540'
            document.getElementById(`b${i}`).style.boxShadow = "0px 5px #102129"
        }
        document.getElementById('WinnerScreen').classList.add('hide');
        document.getElementById('BodyColor').style.backgroundColor = '#192A32'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#1F3540'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #102129"
        document.getElementById('XBoxColor').style.backgroundColor = '#31C4BE'
        document.getElementById('OBoxColor').style.backgroundColor = '#F2B237'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #6C8997'
        document.getElementById('InfoButton').style.color = "#A8BEC9"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 3px #31C4BE,-1px -1px 3px #31C4BE"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 3px #F2B237,-1px -1px 3px #F2B237"
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })

    let quit = document.getElementById('Quit');
    quit.addEventListener('click', () => {
        document.getElementById('PlayerModePage').classList.remove('hide')
        XWinningCondition = [];
        OWinningCondition = [];
        if (ChangeTurn) {
            Turn = 0
            document.getElementById('TurnIconChange').innerHTML = 'trip_origin'
            ChangeTurn = false;
        }
        else {
            Turn = 1
            document.getElementById('TurnIconChange').innerHTML = 'close'
            ChangeTurn = true;
        }
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
            document.getElementById(`b${i}`).style.backgroundColor = '#1F3540'
            document.getElementById(`b${i}`).style.boxShadow = "0px 5px #102129"
        }
        document.getElementById('WinnerScreen').classList.add('hide');
        document.getElementById('BodyColor').style.backgroundColor = '#192A32'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#1F3540'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #102129"
        document.getElementById('XBoxColor').style.backgroundColor = '#31C4BE'
        document.getElementById('OBoxColor').style.backgroundColor = '#F2B237'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #6C8997'
        document.getElementById('InfoButton').style.color = "#A8BEC9"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 3px #31C4BE,-1px -1px 3px #31C4BE"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 3px #F2B237,-1px -1px 3px #F2B237"
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })
}

function P1vsC() {
    document.getElementById('ComputerOrO').innerHTML="AI's WIN"
    document.getElementById('PlayerModePage').classList.add('hide');
    /*__Info Button___*/

    let InfoButton = document.getElementById('InfoButton')
    let InfoDetail = document.getElementById('MainInfoDetail')

    InfoButton.addEventListener('click', () => {
        InfoDetail.classList.toggle("hide")
        InfoButton.classList.add('hide')
    })

    InfoDetail.addEventListener('click', () => {
        InfoDetail.classList.toggle("hide")
        InfoButton.classList.remove('hide')
    })
    let Turn = 1;
    let XWinCount = 0;
    let ComputerWinCount = 0;
    let TieCount = 0;
    let IsHover = [true, true, true, true, true, true, true, true, true, true]

    let WiningProbability = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [3, 6, 9], [2, 5, 8]]
    let WiningProbabilitySum = [6, 15, 24, 15, 15, 12, 18, 15];
    let XWinningCondition = [];
    let ComputerWinningCondition = [];
    let CFirstMove = 1;

    for (let i = 1; i <= 9; i++) {
        document.getElementById(`fb${i}`).addEventListener('mouseenter', () => {
            if (Turn && IsHover[i]) {
                document.getElementById(`b${i}`).innerHTML = `<span class="material-symbols-outlined opacity"id="XSymbol${i}">
                close
                </span>`
            }
            else {
                document.getElementById(`b${i}`).innerHTML = ""
            }
        }, false)

        if (IsHover[i]) {
            document.getElementById(`fb${i}`).addEventListener('mouseleave', () => {
                document.getElementById(`b${i}`).innerHTML = ""
            }, false)
        }

        document.getElementById(`fb${i}`).addEventListener('click', () => {
            IsHover[i] = false;
            if (Turn) {
                // CheckXWin(XWinningCondition,ComputerWinningCondition);
                document.getElementById(`fb${i}`).innerHTML = `<span class="material-symbols-outlined opacity"id="XSymbol${i}">
                close
                </span>`
                XWinningCondition.push(i);
                console.log("X-Area=", XWinningCondition);
                console.log("C-Area",ComputerWinningCondition);
                document.getElementById('TurnIconChange').innerHTML = 'trip_origin';
                Turn = 0;
                IsHover[i]=false;
                CheckXWin(XWinningCondition,ComputerWinningCondition);
                ComputerTurn();
            }
        })
    }

    let index=0;
    function ComputerTurn() {
        // console.log(XWinningCondition);
        CheckXWin(XWinningCondition,ComputerWinningCondition);
        let Count = 0;
        let Sum1 = 0;
        let Sum2 = 0;
        let once = false;
        let CompareSubArray = [];
        if (CFirstMove == 1) {
            let Move = GenerateRandom();
            document.getElementById(`fb${Move}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${Move}">
            trip_origin
            </span>`
            ComputerWinningCondition.push(Move);
            // console.log("Computer=", ComputerWinningCondition);
            CFirstMove++;
            IsHover[Move] = false;
            Turn = 1;
            return 0;
        }
        else if (CFirstMove == 2) {
            CFirstMove++;
            WiningProbability.forEach((probability) => {
                Sum1 = 0;
                Count = 0;
                for (let i = 0; i < 3; i++) {
                    if (XWinningCondition.indexOf(probability[i]) > -1) {
                        Sum1 = Sum1 + probability[i];
                        Count++;
                    }
                }
                if (Count == 2) {
                    probability.forEach((x) => {
                        Sum2 = Sum2 + x;
                    })
                    let NextMove = Sum2 - Sum1;
                    if (IsHover[NextMove]) {
                        document.getElementById(`fb${NextMove}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${NextMove}">
                        trip_origin
                        </span>`
                        ComputerWinningCondition.push(NextMove);
                        // console.log("Computer=", ComputerWinningCondition);
                        IsHover[NextMove] = false;
                        once=true;
                        Turn = 1;
                        return 0;
                    }
                }
                if(index==7 && once==false){
                    SecondMoveRandom();
                }
                index=index+1;
            })
            
            function SecondMoveRandom(){
                for(let k=0;k<8;k++){
                    if(WiningProbability[k].indexOf(ComputerWinningCondition[0]) > -1){
                        if (IsHover[WiningProbability[k][0]] == true && IsHover[WiningProbability[k][1]] == true && IsHover[WiningProbability[k][2]]==false) {
                            document.getElementById(`fb${WiningProbability[k][0]}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${WiningProbability[k][0]}">
                            trip_origin
                            </span>`
                            ComputerWinningCondition.push(WiningProbability[k][0]);
                            // console.log("Computer=", ComputerWinningCondition);
                            IsHover[WiningProbability[k][0]] = false;
                            Turn = 1;
                            return 0;
                        }
                        else if (IsHover[WiningProbability[k][0]] == false && IsHover[WiningProbability[k][1]] == true && IsHover[WiningProbability[k][2]]==true) {
                            document.getElementById(`fb${WiningProbability[k][1]}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${WiningProbability[k][1]}">
                            trip_origin
                            </span>`
                            ComputerWinningCondition.push(WiningProbability[k][1]);
                            // console.log("Computer=", ComputerWinningCondition);
                            IsHover[WiningProbability[k][1]] = false;
                            Turn = 1;
                            return 0;
                        }
                        else if(IsHover[WiningProbability[k][0]] == true && IsHover[WiningProbability[k][1]] == false && IsHover[WiningProbability[k][2]]==true) {
                            document.getElementById(`fb${WiningProbability[k][2]}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${WiningProbability[k][2]}">
                            trip_origin
                            </span>`
                            ComputerWinningCondition.push(WiningProbability[k][2]);
                            // console.log("Computer=", ComputerWinningCondition);
                            IsHover[WiningProbability[k][2]] = false;
                            Turn = 1;
                            return 0;
                        }
                    }
                    else{
                        continue;
                    }
                }
            }
        }
        else{
            for(let k=0;k<8;k++){
                let S=0;
                let Sub;
                WiningProbability[k].forEach((x)=>{
                    if(ComputerWinningCondition.indexOf(x) > -1){
                        CompareSubArray.push(x);
                        S = S + x;
                    }
                })

                console.log("Array=", CompareSubArray);
                console.log("Sum=", S,"__k=",k);
                Sub= WiningProbabilitySum[k]-S;
                if(CompareSubArray.length ==2 && IsHover[Sub] == true){
                    document.getElementById(`fb${Sub}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${Sub}">
                    trip_origin
                    </span>`
                    ComputerWinningCondition.push(Sub);
                    // console.log("Computer=", ComputerWinningCondition);
                    CompareSubArray = [];
                    IsHover[Sub] = false;
                    Turn=1;
                    CheckXWin(XWinningCondition,ComputerWinningCondition);
                    CompareSubArray=[];
                    return 0;
                }
                CompareSubArray=[];
            }
            

            for (let j = 0; j < 8; j++){
                let Sub;
                let Sum3 = 0;
                let once1=false;

                WiningProbability[j].forEach((x)=>{
                    if (XWinningCondition.indexOf(x) > -1) {
                        CompareSubArray.push(x);
                        Sum3 = Sum3 + x;
                    }
                })

                // console.log("Sum=", Sum3,"__j=",j,"__once1=",once1);
                // console.log("Array=", CompareSubArray);
                Sub = WiningProbabilitySum[j] - Sum3;
                if (CompareSubArray.length == 2 && IsHover[Sub] == true) {
                    console.log("CompareArray=", CompareSubArray);
                    document.getElementById(`fb${Sub}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${Sub}">
                    trip_origin
                    </span>`
                    ComputerWinningCondition.push(Sub);
                    // console.log("Computer=", ComputerWinningCondition);
                    CompareSubArray = [];
                    IsHover[Sub] = false;
                    Turn=1;
                    once1=true;
                    CheckXWin(XWinningCondition,ComputerWinningCondition);
                    return 0;
                }
                else {
                    if(j==7 && once1==false){
                        RandomOTurn();
                    }
                }
                CompareSubArray=[];
            }
        }
    }

    function CheckXWin(X,O){
        let TestArray=[];
        WiningProbability.forEach((probability) => {
            if (1){
                for (let i = 0; i < X.length; i++) {
                    if (X.indexOf(probability[i]) > -1) {
                        TestArray.push(probability[i])
                    }
                }
                let a = probability.toString();
                let b = TestArray.sort();

                if(b.toString() == a) {
                    console.log("abcd___________");
                    XWinCount = XWinCount + 1;
                    XWinner(TestArray);
                    return 0;
                }
                else{
                    TestArray=[];
                }
            }
            if(1){
                for (let i = 0; i < O.length; i++) {
                    if (O.indexOf(probability[i]) > -1) {
                        TestArray.push(probability[i])
                    }
                }
                let a = probability.toString();
                let b = TestArray.sort();

                if (b.toString() == a) {
                    ComputerWinCount = ComputerWinCount+ 1;
                    CWin(TestArray);
                    return 0;
                }
                else {
                    TestArray = [];
                }
            }
        })
        let count = 0
        // console.log(Tie);
        for (let i = 1; i <= 9; i++) {
            if (IsHover[i] == false) {
                count++;
            }
        }
        if (count == IsHover.length - 1) {
            MatchTie(TestArray);
            return 0;
        }
    }

    function MatchTie(HighlightIndex) {
        index=0;
        document.getElementById('WhoWin').innerHTML = 'MATCH TIE!'
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('TakesRoundOrTieText').innerHTML = "NO ONE TAKES ROUND"
        document.getElementById('WinIcon').innerHTML = "";
        document.getElementById('TakesRoundOrTieText').style.color = "#A8BEC9"
        WinBoxLeftColor(HighlightIndex)
        // WinBelongs = [];
        TieCount++;
        document.getElementById('TieCount').innerHTML = TieCount;
    }


    function XWinner(HighlightIndex) {
        // XWinCount=XWinCount+1;
        HighlightIndex.forEach((x) => {
            document.getElementById(`b${x}`).style.backgroundColor = '#31C4BE'
            document.getElementById(`XSymbol${x}`).style.color = '#1F3540'
        })
        document.getElementById('WhoWin').innerHTML = 'YOU WIN!'
        document.getElementById('WinIcon').innerHTML = `<span class="material-symbols-outlined"id="XSymbol1">
        close
        </span>`
        document.getElementById('TakesRoundOrTieText').innerHTML = "TAKES THE ROUND"
        document.getElementById('WinBlockText').classList.add('WinColorX');
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('XWinCount').innerHTML = XWinCount
        WinBoxLeftColor(HighlightIndex);
        TestArray=[];
        index=0;
        once=false
        return 0;
    }

    function CWin(CHighlightIndex){
        console.log(CHighlightIndex);
        CHighlightIndex.forEach((x) => {
            document.getElementById(`b${x}`).style.backgroundColor = '#F2B237';
            document.getElementById(`OSymbol${x}`).style.color='#1F3540';
        })
        document.getElementById('WhoWin').innerHTML = 'COMPUTER WIN!'
        document.getElementById('WinIcon').innerHTML = `<span class="material-symbols-outlined" id="OSymbol1">
        trip_origin
        </span>`
        document.getElementById('TakesRoundOrTieText').innerHTML = "TAKES THE ROUND"
        document.getElementById('WinBlockText').classList.add('WinColorO');
        document.getElementById('WinnerScreen').classList.remove('hide');
        document.getElementById('OWinCount').innerHTML = ComputerWinCount;
        WinBoxLeftColor(CHighlightIndex)
        CompareSubArray=[];
        index=0;
        return 0;
    }

    function WinBoxLeftColor(l){
        console.log(l);
        for (let i = 1; i <= 9; i++) {
            if (i != l[0] && i != l[1] && i != l[2]) {
                document.getElementById(`b${i}`).style.backgroundColor = "#0F1A20"
                document.getElementById(`b${i}`).style.boxShadow = "0px 5px #071115"
            }
        }
        document.getElementById('BodyColor').style.backgroundColor = '#0C1319'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#0F1A20'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #071015"
        document.getElementById('XBoxColor').style.backgroundColor = '#19615E'
        document.getElementById('OBoxColor').style.backgroundColor = '#78581B'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#545F65'
        document.getElementById('RefreshBox').style.backgroundColor = '#545F65'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #35444B'
        document.getElementById('InfoButton').style.color = "#545F65"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 2px #31c4bf78,-1px -1px 2px #31c4bf78"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 2px #f2b1378a,-1px -1px 2px #f2b1378a"
        return 0;
    }

    let refresh = document.getElementById('RefreshBox').addEventListener('click', () => {
        XWinningCondition = [];
        ComputerWinningCondition = [];
        // XWinCount = 0;
        // ComputerWinCount = 0;
        // TieCount = 0
        Turn = 1;
        index=0;
        CFirstMove=1;
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
        }

        document.getElementById('TurnIconChange').innerHTML = 'close'
        document.getElementById('XWinCount').innerHTML = '0';
        document.getElementById('OWinCount').innerHTML = '0';
        document.getElementById('TieCount').innerHTML = '0';
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })

    let ChangeTurn = true;

    let NextRound = document.getElementById('NextRound').addEventListener('click', () => {
        XWinningCondition = [];
        ComputerWinningCondition = [];
        Turn=1;
        CFirstMove=1;
        index=0;
        // if (ChangeTurn) {
        //     Turn = 0
        //     document.getElementById('TurnIconChange').innerHTML = 'trip_origin'
        //     ChangeTurn = false;
        // }
        // else {
        //     Turn = 1
        //     document.getElementById('TurnIconChange').innerHTML = 'close'
        //     ChangeTurn = true;
        // }
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
            document.getElementById(`b${i}`).style.backgroundColor = '#1F3540'
            document.getElementById(`b${i}`).style.boxShadow = "0px 5px #102129"
        }
        document.getElementById('WinnerScreen').classList.add('hide');
        document.getElementById('BodyColor').style.backgroundColor = '#192A32'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#1F3540'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #102129"
        document.getElementById('XBoxColor').style.backgroundColor = '#31C4BE'
        document.getElementById('OBoxColor').style.backgroundColor = '#F2B237'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #6C8997'
        document.getElementById('InfoButton').style.color = "#A8BEC9"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 3px #31C4BE,-1px -1px 3px #31C4BE"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 3px #F2B237,-1px -1px 3px #F2B237"
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })

    let quit = document.getElementById('Quit');
    quit.addEventListener('click', () => {
        document.getElementById('PlayerModePage').classList.remove('hide')
        XWinningCondition = [];
        ComputerWinningCondition= [];
        index=0;
        CFirstMove=1;
        if (ChangeTurn) {
            Turn = 0
            document.getElementById('TurnIconChange').innerHTML = 'trip_origin'
            ChangeTurn = false;
        }
        else {
            Turn = 1
            document.getElementById('TurnIconChange').innerHTML = 'close'
            ChangeTurn = true;
        }
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`fb${i}`).innerHTML = ""
            IsHover[i] = true
            document.getElementById(`b${i}`).style.backgroundColor = '#1F3540'
            document.getElementById(`b${i}`).style.boxShadow = "0px 5px #102129"
        }
        document.getElementById('WinnerScreen').classList.add('hide');
        document.getElementById('BodyColor').style.backgroundColor = '#192A32'
        document.getElementById('TurnBoxColor').style.backgroundColor = '#1F3540'
        document.getElementById('TurnBoxColor').style.boxShadow = "0px 4px #102129"
        document.getElementById('XBoxColor').style.backgroundColor = '#31C4BE'
        document.getElementById('OBoxColor').style.backgroundColor = '#F2B237'
        document.getElementById('TiesBoxColor').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.backgroundColor = '#A8BEC9'
        document.getElementById('RefreshBox').style.boxShadow = '0px 3px #6C8997'
        document.getElementById('InfoButton').style.color = "#A8BEC9"
        document.getElementById('HeadXIcon').style.textShadow = "1px 1px 3px #31C4BE,-1px -1px 3px #31C4BE"
        document.getElementById('HeadOIcon').style.textShadow = "1px 1px 3px #F2B237,-1px -1px 3px #F2B237"
        document.getElementById('WinBlockText').classList.remove('WinColorX');
        document.getElementById('WinBlockText').classList.remove('WinColorO');
    })



    function RandomOTurn(){
        let flag=true;
        let CWinnerCompare=[];
        WiningProbability.forEach((probability)=>{
            let sum=0;
            for(let i=0;i<3;i++){
                sum=sum+probability[i];
                if(ComputerWinningCondition.indexOf(probability[i]) > -1){
                    CWinnerCompare.push(probability[i]);
                }
            }
            console.log("WinnerComapare=",CWinnerCompare);
            if(CWinnerCompare.length==2 && IsHover[sum-(CWinnerCompare[0]+CWinnerCompare[1])]==true){
                document.getElementById(`fb${sum-(CWinnerCompare[0]+CWinnerCompare[1])}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${sum-(CWinnerCompare[0]+CWinnerCompare[1])}">
                trip_origin
                </span>`
                ComputerWinningCondition.push(sum-(CWinnerCompare[0]+CWinnerCompare[1]));
                Turn=1;
                IsHover[sum-(CWinnerCompare[0]+CWinnerCompare[1])]=false;
                flag=false;
                // CheckXWin(XWinningCondition,ComputerWinningCondition);
                return 0;
            }
            CWinnerCompare=[];
        })
        if(flag){
            for(let i=0;i<=7;i++){
                if(i==0){
                    continue;
                }
                if(IsHover[i]==true && Turn==0){
                    console.log("helo",i);
                    document.getElementById(`fb${i}`).innerHTML = `<span class="material-symbols-outlined" id="OSymbol${i}">
                        trip_origin
                        </span>`
                    ComputerWinningCondition.push(i);
                    Turn=1;
                    IsHover[i]=false;
                    // CheckXWin(XWinningCondition,ComputerWinningCondition);
                    break;
                }
            }
            CompareSubArray=[];
            return 0;
        }
    }

    function GenerateRandom() {
        RandomNumber = Math.floor(Math.random() * 9 + 1);
        if (RandomNumber != XWinningCondition[0]) {
            return RandomNumber;
        }
        else {
            RandomNumber = Math.floor(Math.random() * 9 + 1);
            if (RandomNumber != XWinningCondition[0]) {
                return RandomNumber;
            }
            else {
                if (RandomNumber != XWinningCondition[0]) {
                    return RandomNumber;
                }
            }
        }
    }
    return 0;
}














