function unProject(y,x)
{
    return y*WIDTH + (x - 1);
}
window.onload = function(){
    var bkg = document.getElementById("bkg");
    var blks = [];

    const tips = [
        "为什么标题不用英语？我们可不稀罕资本家的语言。",
        "亲爱的伊凡诺维奇将军，我们敬爱的同志，您即将带领伟大的联盟走向胜利。",
        "指挥官同志，请您注意这些方块，当它们排成一行，我们就可以对德军发起一次进攻。",
        "伊凡诺维奇将军，斯大林同志对你的表现非常满意。",
    ];
    const specialTips = [
        "关键性的胜利！德国人现在已经穷途末路了。",
        "斯大林命令你现在立刻回到克里姆林宫！"
    ];
    var bgm = new Audio("./audio/kaqiusha.mp3");
    const btn_up = document.getElementById("btn_up");
    const btn_down = document.getElementById("btn_down");
    const btn_left = document.getElementById("btn_left");
    const btn_right = document.getElementById("btn_right");

    var score = 0;
    var el = 0;
    const dis_score = document.getElementById("score");
    const dis_eliminated = document.getElementById("eliminated");
    const dis_chats = document.getElementById("tips");

    const bgmSwitch = document.getElementById("bgmSwitch");
    bgmSwitch.selected = false;
    bgmSwitch.onclick = function(){
        if (this.selected)
        {
            this.className = "not_selected"
            bgm.pause();
        }
        else
        {
            this.className = "selected"
            bgm.play();
        }
        this.selected = !this.selected;
    }

    
    for (let i = 0;i < WIDTH*HEIGHT;i++)
    {
        let blk = document.createElement("div");
        blk.className = "bc01";
        blk.style.visibility = 'hidden';
        blks.push(blk);
        bkg.appendChild(blk);
    }
    function paint(){
        for (let i = 0;i < HEIGHT;i++)
        {
            for (let j = 1;j < WIDTH + 1;j++)
            {
                if (map[i][j] == '#')
                {
                    blks[unProject(i,j)].className = 'bc01';
                    blks[unProject(i,j)].style.visibility = 'visible';
                }
                else if (map[i][j] == ' ')
                {
                    blks[unProject(i,j)].style.visibility = 'hidden';
                }
                else if(map[i][j] == '%')
                {
                    blks[unProject(i,j)].className = 'bc02';
                    blks[unProject(i,j)].style.visibility = 'visible';
                }
            }
        }
    }

    window.onkeydown = function(event)
    {
        if (event.keyCode === 38)
        {
            if (!testImpact(3))
            {
                rotate(activeblock);    
            }
        }
        else if (event.keyCode === 37)
        {
            if (!testImpact(1))
            {
                startX--;
            }
        }
        else if (event.keyCode === 39)
        {
            if (!testImpact(2))
            {
                startX++;
            }
        }
        else if (event.keyCode === 40)
        {
            basicLogic();
        }
        if (event.keyCode >= 37 && event.keyCode <= 40)
        {
            Redraw();
            paint();
        }
    }
    btn_up.onclick = () =>{
        if (!testImpact(3))
        {
            rotate(activeblock);
            Redraw();
            paint();
        }
    };
    btn_down.onclick = () =>{
        basicLogic();
    };
    btn_left.onclick = () => {
        if (!testImpact(1))
        {
            startX--;
            Redraw();
            paint();
        }
    };
    btn_right.onclick = () => {
        if (!testImpact(2))
        {
            startX++;
            Redraw();
            paint();
        }
    };

    function count_score(lines)
    {
        switch(lines.length)
        {
            case 0:
            {
                score += 5;
                break;
            }
            case 4:
            {
                score += 190;
                el += 1;
            }
            case 3:
            {
                score += 150;
                el += 1;
            }
            case 2:
            {
                score += 120;
                el += 1;
            }
            case 1:
            {
                score += 100;
                el += 1;
            }
        }
        dis_score.innerHTML = score;
        dis_eliminated.innerHTML = el;
    }

    function setTips(strs)
    {
        dis_chats.innerHTML = strs;
    }
    //正式游戏逻辑
    function basicLogic()
    {
        if (!testImpact(0))
        {
            startY++;
        }
        else
        {
            if (startY <= -1)
            {
                setTips(specialTips[1]);
                Redraw();
                paint();
                clearInterval(maintimer);
                clearInterval(cheatimer);
                bgm.pause();
                bgm = null;
                //alert('游戏结束');
                return;
            }
            putBlock();
            let clearedLines = testLine();
            count_score(clearedLines);
            if (clearedLines.length > 0)
            {
                setTips(specialTips[0]);
            }
            handleLine(clearedLines);
            generate();
        }
        Redraw();
        paint();
    }
    generate();
    setTips(tips[Math.trunc(Math.random()*tips.length)]);
    var maintimer = setInterval(basicLogic,500);
    var cheatimer = setInterval(() =>{
        setTips(tips[Math.trunc(Math.random()*tips.length)]);
    },10000);

}