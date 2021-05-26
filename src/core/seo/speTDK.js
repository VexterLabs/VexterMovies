// 对需要特殊处理的8本书籍设置tdk
export function eightSepHandleTDK(bookId){
    let format = false;
    const SpeTDKS = [
        {   
            id:21000001296,
            bookName:"The Shadow Alpha",
            title:"The Shadow Alpha By Kajal Haripersad",
            introduction:"His eyes locked with mine and I could feel the strength of the mate bond gnawing at me, but I forced it down. Devin eyed me with annoyance and lust prominent in his gorgeous grey eyes. “Alpha Devin, this is my daughter.” Papa Jamie said with pride in his voice. Devin gave him a weird look, but turned to me instead. Before he could speak I cut him off with a surveying look from head to toe. He was still as hot as hell if not more; his body was more built and his face more chiseled than before. He looked all man and sue me for finding it sexy. Damn mate bond. My eyes were void of emotion as I looked at the pack that flanked him and back into his stormy grey eyes. I stuck out my hand with a smirk on my face, “Welcome to the Blue Moon Pack.” He grasped my hand and shocks ran up my arm and through my body as it did his causing his eyes to widen, but before he could react I continued. “I am Alpha Allison Trust Wells.” My tone oozed confidence and mirth. I heard a few gasps, but the biggest reaction I got was from Devin whose eyes widened in shock. ~~~ A story of hurt, betrayal and second chances in a world of mystical creatures. Allison is a young Shewolf with a gift from the Goddess Selene. Join her as she navigates the web of secrets and lies weaved by the people she once thought of as family and learns forgiveness. Not all second chances are started on a clean slate...",
            keywords:"The Shadow Alpha,Kajal Haripersad,21000001296,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000001533,
            bookName:"Mated to the Alpha Knight",
            title:"Mated to the Alpha Knight By Elizabeth Jane",
            introduction:"Celeste Williamson is about to turn sixteen, which means she's about to find her mate - this is fine and all, but what happens when her mate turns out to be her brother? Will she accept him or find out a hidden truth? Be his mate or reject him to keep her own sanity? Not only is her brother her mate, but talk of a prophecy starts to cloud her judgement... And even worse, Celeste seems to be the target... How will she balance these challenges? Will she find out her entire life has been a lie? Or will she find her destiny within these hidden truths?",
            keywords:"Mated to the Alpha Knight,Elizabeth Jane,21000001533,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000002832,
            bookName:"Alpha Of Aberdeen",
            title:"Alpha Of Aberdeen By Cc Lopez",
            introduction:"Chapters for the sequel Alpha Of Aberdeen When Past & Present Collide have started and are on here... Chloe is a human living in a werewolf world, her best friend Amelia is a werewolf, and when she invites Chloe to the ball of the year, Chloe's life is changed forever when she meets the Alpha.",
            keywords:"Alpha Of Aberdeen,Cc Lopez,21000002832,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000003856,
            bookName:"The Charismatic Charlie Wade",
            title:"The Charismatic Charlie Wade By Lord Leaf （Story of The Amazing Son in Law）",
            introduction:"「The Amazing Son in Law」：Charlie Wade was the live-in son-in-law that everyone despised, but his real identity as the heir of a prominent family remained a secret. He swore that one day, those who shunned him would kneel before him and beg for mercy, eventually!",
            keywords:"The Amazing Son in Law,The Charismatic Charlie Wade,Lord Leaf,21000003856,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000002011,
            bookName:"The Pampering CEO: Don't Mess With My Secretly-Married Sweet Wife",
            title:"The Pampering CEO: Don't Mess With My Secretly-Married Sweet Wife By The Running Lamb",
            introduction:"Before their marriage, he said, “Our marriage is just an agreement on a piece of paper. Privately, we have nothing to do with each other.” After their marriage, whenever she ran into trouble, he would help her. When she was bullied, he would protect her. She obeyed the agreement and hid the fact that they were married but he announced to the world that she was his wife. When he secretly slipped into bed again, Susan got agitated. “What do you actually want?” He wore an innocent look as he begged, “Please hug me. Please kiss me. Please…” Facing the rogue CEO, Susan could only admit defeat. It was only many years later that she realized that he had loved her for a very long time.",
            keywords:"The Pampering CEO: Don't Mess With My Secretly-Married Sweet Wife,The Running Lamb,21000002011,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000003857,
            bookName:"Spoiled By The President: My Wife Is A Little Sweet",
            title:"Spoiled By The President: My Wife Is A Little Sweet By Cloud Tree",
            introduction:"Her boyfriend and her sister tangled together in the sheets, so she turned around and married the fearsome business tycoon, Gideon Leith.Not only is she a star in her own right, but she’s also a publicist and an entrepreneur? A super race-car driver? A world-renown gold medalist designer too?! Just who is this precious hidden treasure of a girl!!!She went from being pitifully spurned to a goddess looked up to by tens of thousands of people, and her admirers queued from Jincheng all the way to Kyoto.Mr. Leith, who saw a certain someone’s feminine charm, quickly tucked her into his arms. “Wife, I need to hide you well. You can only belong to me!”",
            keywords:"Spoiled By The President: My Wife Is A Little Sweet,Cloud Tree,21000003857,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000003253,
            bookName:"A Ruling Passion: Mr Tremont's Priceless Little Bride",
            title:"A Ruling Passion: Mr Tremont's Priceless Little Bride By Lemon Flavored Cat",
            introduction:"A plane crash had orphaned her... he too, shared the exact same fate. However, his misfortune was all her father’s doing.She was at the young age of eight when he, who was ten years older, brought her to the Tremont Estate. She thought this kind gesture came from the good will of his heart. Little did she know, it was for retribution.For ten years, she had always thought that he hated her. He was gentle and benevolent to the world, but never towards her…He forbade her from calling him ‘brother’. She could only call him by his name - Mark Tremont, Mark Tremont, over and over again till it was ingrained deeply in her head...",
            keywords:"A Ruling Passion: Mr Tremont's Priceless Little Bride,Lemon Flavored Cat,21000003253,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        },
        {   
            id:21000002004,
            bookName:"A Dangerous Atrophy",
            title:"A Dangerous Atrophy By Qi River's Old Stream",
            introduction:"Rosaline died, and Sean personally put Jane into the women's prison for it. “Take good care of her”— his words made her three years in prison a living hell and even cost her a kidney. Before she went to prison, Jane said, “I didn't kill her,” but Sean was unmoved. After her release from prison, she said, “I killed Rosaline, I'm guilty as sin!” Sean was livid as he said, “Shut up! I don't want to hear you say that!” Jane laughed. “Yes, I killed Rosaline Summers, and I did three years in prison for it.” She escaped, and Sean scoured the whole world for her. Sean said, “I'll give you my kidney, Jane, if you'll give me your heart.” But Jane looked up at Sean and said, “I don't love you anymore, Sean…”",
            keywords:"A Dangerous Atrophy,Qi River's Old Stream,21000002004,werewolf books,web novels,horror,scary story,web fiction,romance,dreame,wattpad,good reads,google play books, audio books,amazon books",
        }
    ]
    SpeTDKS.forEach((item)=>{
        if(item.id == bookId){
            format = item;
            return;
        }
    })
    return format;
}