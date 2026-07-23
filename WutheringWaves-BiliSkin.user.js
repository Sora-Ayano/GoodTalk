// ==UserScript==
// @name         Good Good Talk Day Day UP
// @version      0.6.0
// @description  On the Internet, nobody knows you're a dog.
// @match        https://*.bilibili.com/*
// @exclude      https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      i0.hdslb.com
// @connect      i1.hdslb.com
// @connect      i2.hdslb.com
// @connect      api.bilibili.com
// @connect      api.vc.bilibili.com
// @connect      gitee.com
// ==/UserScript==

/* ===========================================================================
 * 免责声明 (Disclaimer)
 * ---------------------------------------------------------------------------
 * 1. 本脚本为个人学习与交流用途的第三方浏览器用户脚本，非官方产品。
 * 2. 表情包内容归版权公司所有，表情包等图片素材引用自公开网络图床链接，作者不托管、不分发任何版权图片资源。
 * 3. 本脚本的「评论净化」功能基于用户本地配置的关键词/正则屏蔽，仅作用于用户本人浏览器所展示的页面，不修改、不删除、不抓取任何B站服务器数据，不影响其他用户的正常浏览与发言，不构成对他人言论的审查或干预。屏蔽词默认宽松，用户自行承担责任与风险。
 * 4. 严禁将本脚本用于：大规模自动举报、人肉、开盒、有组织网络暴力、刷量、破坏其他用户正常使用等违反法律及平台规则的行为。使用本脚本即表示您同意自行承担因不当使用而产生的一切责任，作者不承担任何连带责任。
 * ===========================================================================
 */

(function (unsafeWindow) {
    'use strict';

    const BB = {};
    unsafeWindow.BB = BB;

    // ===================================================================
    // BB.BuiltinBlocklist —— 内置分层词库（对应 assets/default-blocklist.json）
    //   注：油猴脚本无法直接 fetch 本地文件，这里以字面量内联；
    //   assets/default-blocklist.json 仅作为「可导入/导出」的格式范本供用户参考。
    // ===================================================================
    BB.BuiltinBlocklist = {
        L1: [
            // === 米系黑话 ===
            "孝子","米孝子","米孝孙","孝孙","米卫兵","卫兵","米逆子","逆子","顺子","米顺子",
            "原批","原劈","原批批","OP","叩","op","Op","崩批","崩劈","穹批","星批","铁批","绝批","绝区批",
            "米批","米劈","mxz","MXZ","mvb","MVB","米爹","米桑","米忽悠","mhy","MHY","mihoyo","米学长","学长","学姐",
            "米结晶","米娇妻","米虫","米粉","米游社","崩批2","三崩子","铁道批","未定批","未定孝子",
            "米站","米乎","米ga","鸡场主","鸡厂主","鸡桑",
            "鸡场","鸡厂","烧鸡","尸块","鸡块","推推","图图","烧0","骨灰盒",
            "猿神","倭叩","倭批","龟男","缩头龟","缅北","冰清玉洁",
            "魔怔人","MZP","魔怔","pgr","批哥","mx01",
            "结晶","结晶粉","舔狗","护主",
            "你被猴打过","被猴打","二手烟","少主夫人","水军","收钱",
            "急孝","跪着玩","孝死","尽孝","脑残粉","结晶卫兵","猴厂","猴山",
            // === 游戏多厂商黑话 ===
            "鹅厂","鹅孝子","鹅卫兵","鹅厂孝子","鹅批","腾批","疼批","tx孝子","腾讯孝子",
            "DNF批","dnf批","农药批","wzry批","王者批","LOL批","cf批",
            "猪场","猪厂","猪孝子","猪卫兵","wy孝子","阴阳师批","YYS批",
            "粥批","粥孝子","粥卫兵","鹰角孝子","yj孝子","角孝子","皱皮","粥批粥",
            "库洛孝子","鸣批","库批","库孝子","kl孝子","潮批",
            //"酷狗","库狗",（其实这俩可以不算）
            "叠纸孝子","dz孝子","叠批","暖暖批",
            "西山居孝子","剑三批","j3批",
            "厂商孝子","厂商批","孝子化","孝子圈","厂商xz","xz全家桶",
            "任豚","索狗","索嗨","软软","steam孝子","epic孝子",
            "手游狗","手游批","端游优越狗","端游天龙人","主机狗",
            // === 男女对立 — 女性攻击向 ===
            "小仙女","xxn","Xxn","XXN","拳师","女拳","女拳师","拳塔一体","打拳",
            "母狗","母人","mg","MG","幕刃","muren","木刃","铁木真",
            "飞柱","坦克坦","坦克女","集美","集短","集霸","雌竞","媚男","媚女",
            "婚驴","驴驴","娇妻","恋爱脑","沸羊羊","猫猫狗狗",
            // === 男女对立 — 男性攻击向 ===
            "普信男","下头男","蛆","男蛆","蛆蛆","incel","incel男","细狗",
            "龟龟","蜗男","妈宝男","巨婴男","郭楠","蝈男","gn","GN","蚪蝌","dz",
            // === 通用生殖/性侮辱 ===
            "去势","阉割","绝育","结扎","排卵","发情","绝经","绝精","阳痿","早泄",
            // === 手机厂商别称/黑称 ===
            "华萎","华伪","牢厂","牢厂机","菊花厂","花厂","海军","higo","HiGo","滑萎","251厂","牢厂251","增智慧","哄蒙","华为狗",
            "冖糇","猴厂机","耍猴","雷大善人","耍猴厂","猴机","miboy","mifan",
            "果蛆","果蛐","果吹","apple孝子",
            "厂妹机","高价低配","智商检测机","耻辱机",
            "三丧","丧星","星孝子",
            // === 通用人身攻击 ===
            "脑残","nc","NC","nt","NT","弱智","制杖","沙卵","傻卵","傻狗","贱婢","贱逼","畜生",
        ],
        L2: [
            // === 米系引战 ===
            "串子","反串","忠装反","反装忠","串子哥","捧杀","拉踩","踩一捧一",
            "带节奏","节奏狗","带哥","带佬","黑子说话","白子说话",
            "米黑","黑米","反米","米黑头子","假粉","招黑","黑子头子",
            "厂商粉","厂商孝子","ysg","zng","ysl",
            "孝子净化","封建米游","赛博尽孝","反串黑","纯属反串",
            "护主心切","洗地","洗白","学长","米家学长","米学长",
            "米哈游的狗","结晶米卫兵","老任","老米",
            // === 男女人群标签/争议用语 ===
            "国男","普信","下头","大猪蹄子","凤凰男","直男癌","男权","男拳",
            "国女","捞女","彩礼","婚绿","easy girl","eg","egirl","倒贴","拎B入住",
            "性别对立","男女对立","打拳现场","拳法","拳法精准","拳师出征","性别战争","生育工具",
            // === 厂商天龙人对立 ===
            "天龙人","主机天龙人","单机天龙人","婆罗门","PC党","单机孝子",
            "任地狱","蒸汽人",
            "3A婆罗门","4399","页游狗",
            // === 串子/节奏通用 ===
            "带节奏的","引来流量的","流量密码","反串钓","钓鱼贴","钓鱼执法","钓鱼佬",
            "节奏大师","拱火","煽风点火","别有用心","居心叵测","拱火人","节奏起飞",
            // === 反装忠/捧杀 ===
            "吹一踩一","无脑吹","无脑喷","反智粉","无脑黑","无脑护","智熄粉",
        ],
        L3: [
            // === 基础 ===
            "前排","打卡","考古","挖坟","高能","前方高能",
            "急了","急急急","破防","破防了","润了","溜了","闪了",
            "笑死","笑不活了","蚌埠住了","绷不住","绷","典中典",
            "赢麻了","赢学家","寄了","寄寄寄","666",
            "复读机","剧透警告","贴贴","么么哒","卧槽","乐子人",
            "逆天","看乐子","喜闻乐见","学废了",
            // === 互联网烂梗 ===
            "真香","奥利给","我太难了","绝绝子","无语子","YYDS","yyds",
            "家人们谁懂啊","谁懂啊","咱就是说","一整个大动作","破大防","一整个大无语",
            "睿评","鉴定为","狠狠共情","太典了","这波血赚","这波不亏",
            "神中神","真神","唯一的真神","出列","全体起立",
            // === 游戏跟风梗 ===
            "648一单","十连必出","非酋认证","欧皇认证","欧皇附体","非酋附体",
            "抽卡必歪","首充648","首充重置","双倍首充","逼氪","骗氪","逼课",
            "抽卡沉船","吃井","天井",
            // === 手机评测跟风 ===
            "吊打友商","遥遥领先","秒杀iPhone","碾压安卓","不将就","碉堡了",
            "重新定义","方向错了","徒增功耗","感知不强","有失公允","不客观",
            // === 无意义刷屏 ===
            "路过","混脸熟","经验+3","经验加三","经验+","火钳刘明","马克","先马后看",
            "完结撒花","辛苦辛苦","顶顶","帮顶","好贴顶","好帖顶",
            // === 引战低质 ===
            "不服来辩","不接受反驳","你杠就是你对","懂得都懂","懂的都懂","说了你也不懂","细品",
        ],
        // 正则规则：默认全关，由面板勾选 customRegex[id].enabled 启用
        regex: [
            { id:'time-spam',        pattern:"^[\\d零一二两三四五六七八九十百千半]+\\s*(个)?\\s*([hH]|分|分钟|分鐘|小?时|小時)[之以已]?\\s*前[!！？?.。,，～~]*$" },
            { id:'step-on-others',   pattern:"(天下第一|最强|吊打|碾压|完爆|薄纱|秒杀).{0,6}(垃圾|废物|不如|被吊打|彩笔|菜鸡)" },
            { id:'group-kidnap',     pattern:"(我们|咱们|做为|作为).{1,12}(玩家|粉丝|用户).{0,4}(都|全|绝对|必须|一定).{0,20}" },
            { id:'vicious-meme',     pattern:"(是|变成|化成|做成|沦为|属于|就是|简称).{0,6}(烧鸡|尸块|鸡块|🐔块|🐔场|鸡场|图图|烧0|骨灰)" },
            { id:'repeat-detect',    pattern:"(.{1,8})\\1{2,}" },
            { id:'hostile-label',    pattern:"(原|崩|星|铁|绝|鸣|米|游).{0,4}(批|劈|叩|孝|卫|魔怔)" },
            { id:'defection-phrase', pattern:"(被猴打|猴打过|二手烟|少抽|对号入座|收钱|水军|多少钱|跳脸)" },
            { id:'homophone-insult', pattern:"(猿神|圆神|圆批|米忽|米忽悠|迷哈|迷哈油|米哈有|华萎|华伪|滑萎|哄蒙|冖糇|果蛆)" },
            { id:'praise-kill',      pattern:"(太伟大了|太超前了|超时代|降维打击|三体人|文明之光|世界级|神级|封神).{0,10}" },
            { id:'camp-abbreviation',pattern:"\\b(mxz|ysg|zng|ysl|pgr|mzp)\\b.*\\b(mxz|ysg|zng|ysl|pgr|mzp)\\b" },
            { id:'gender-war',        pattern:"(蝈男|郭楠|小仙女|xxn|拳师|普信男).{0,8}(蝈男|郭楠|小仙女|xxn|拳师|普信男|下头|打拳|幕刃)" },
            { id:'console-pc-war',    pattern:"(手游狗|端游狗|主机狗|天龙人|婆罗门|4399).{0,6}(手游狗|端游狗|主机狗|天龙人|婆罗门)" },
            { id:'multi-fanboy',      pattern:"(孝子|卫兵|批|劈|xz).*(厂商|厂|游).*(孝子|卫兵|批|劈|xz)" },
            { id:'phone-war',         pattern:"(海军|higo|miboy|冖糇|耍猴|果蛆|三丧).{0,6}(海军|higo|miboy|冖糇|耍猴|果蛆|三丧|智商税|智商检测)" },
            { id:'group-kidnap-v2',   pattern:"(我们|咱们|做为|作为).{0,20}(玩家|粉丝|用户).{0,4}(都|全|绝对|必须|一定).{0,30}" },
            { id:'praise-to-hate',    pattern:"(天下第一|世界第一|唯一真神|降维打击|薄纱).{0,15}(其他|别的|剩下|全部).{0,6}(都是|全是|就是|等于).{0,6}(垃圾|废物|不如|被秒)" },
        ],
    };

    // ===================================================================
    // BB.BuiltinEmotes —— 表情包
    // 表情图片可直接内联到脚本里或赖任何外部订阅源
    // ===================================================================
    BB.BuiltinEmotes = (function () {
        const PACKS_JSON = '[{"id":99002,"text":"基础webp","url":"//i0.hdslb.com/bfs/new_dyn/e4e19d5bbbcc1d3c02eaac06a2fdbaca31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2},"emote":[{"id":99002001,"package_id":99002,"text":"[基础webp_1]","url":"//i0.hdslb.com/bfs/new_dyn/e4e19d5bbbcc1d3c02eaac06a2fdbaca31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_1"},"flags":{"unlocked":false},"activity":null},{"id":99002002,"package_id":99002,"text":"[基础webp_2]","url":"//i0.hdslb.com/bfs/new_dyn/98c455b0e09593d67b1f3b9e0abbc65431484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_2"},"flags":{"unlocked":false},"activity":null},{"id":99002003,"package_id":99002,"text":"[基础webp_3]","url":"//i0.hdslb.com/bfs/new_dyn/be22979ef456c6424b9085e61382c72931484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_3"},"flags":{"unlocked":false},"activity":null},{"id":99002004,"package_id":99002,"text":"[基础webp_4]","url":"//i0.hdslb.com/bfs/new_dyn/0baffe4cd5de095b8e3d0268195914d231484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_4"},"flags":{"unlocked":false},"activity":null},{"id":99002005,"package_id":99002,"text":"[基础webp_5]","url":"//i0.hdslb.com/bfs/new_dyn/c1fa10d437dd44019ba1886c21385a9631484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_5"},"flags":{"unlocked":false},"activity":null},{"id":99002006,"package_id":99002,"text":"[基础webp_6]","url":"//i0.hdslb.com/bfs/new_dyn/f04ac78bd11e8470a1f180cdd79a0e5a31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_6"},"flags":{"unlocked":false},"activity":null},{"id":99002007,"package_id":99002,"text":"[基础webp_7]","url":"//i1.hdslb.com/bfs/new_dyn/e453f7d077488d523c1f5497d689c61931484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_7"},"flags":{"unlocked":false},"activity":null},{"id":99002008,"package_id":99002,"text":"[基础webp_8]","url":"//i0.hdslb.com/bfs/new_dyn/caf2d2c33ac5bbfad1264e82b80983d331484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_8"},"flags":{"unlocked":false},"activity":null},{"id":99002009,"package_id":99002,"text":"[基础webp_9]","url":"//i0.hdslb.com/bfs/new_dyn/a3ec261cf358177ed88ab99c9fa1e08e31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_9"},"flags":{"unlocked":false},"activity":null},{"id":99002010,"package_id":99002,"text":"[基础webp_10]","url":"//i0.hdslb.com/bfs/new_dyn/6417643798e3a1221fc495311de17bb131484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_10"},"flags":{"unlocked":false},"activity":null},{"id":99002011,"package_id":99002,"text":"[基础webp_11]","url":"//i0.hdslb.com/bfs/new_dyn/5806fb619435699eff6b0f7f48ea511131484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_11"},"flags":{"unlocked":false},"activity":null},{"id":99002012,"package_id":99002,"text":"[基础webp_12]","url":"//i0.hdslb.com/bfs/new_dyn/fd05e4755676949b154b8bdb465d910d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_12"},"flags":{"unlocked":false},"activity":null},{"id":99002013,"package_id":99002,"text":"[基础webp_13]","url":"//i0.hdslb.com/bfs/new_dyn/b71f442a7bebbe34c4dc930a74925ee531484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_13"},"flags":{"unlocked":false},"activity":null},{"id":99002014,"package_id":99002,"text":"[基础webp_14]","url":"//i0.hdslb.com/bfs/new_dyn/c6a240d29a897aabc411a2caf7e6caaf31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_14"},"flags":{"unlocked":false},"activity":null},{"id":99002015,"package_id":99002,"text":"[基础webp_15]","url":"//i0.hdslb.com/bfs/new_dyn/5d07316252495108e73151388129340d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_15"},"flags":{"unlocked":false},"activity":null},{"id":99002016,"package_id":99002,"text":"[基础webp_16]","url":"//i0.hdslb.com/bfs/new_dyn/fc84c332f9122ecb1d7428099cc7804e31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_16"},"flags":{"unlocked":false},"activity":null},{"id":99002017,"package_id":99002,"text":"[基础webp_17]","url":"//i0.hdslb.com/bfs/new_dyn/5438c656b99bbb44f0e6e4eca47cc17a31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_17"},"flags":{"unlocked":false},"activity":null},{"id":99002018,"package_id":99002,"text":"[基础webp_18]","url":"//i0.hdslb.com/bfs/new_dyn/52157d0719cdbe5f5f70d80f8c02a62d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_18"},"flags":{"unlocked":false},"activity":null},{"id":99002019,"package_id":99002,"text":"[基础webp_19]","url":"//i0.hdslb.com/bfs/new_dyn/dc22511a02b27917aa50f2eae6b7953831484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_19"},"flags":{"unlocked":false},"activity":null},{"id":99002020,"package_id":99002,"text":"[基础webp_20]","url":"//i0.hdslb.com/bfs/new_dyn/3d496e45c48ffd75cba09e11d5d9d52631484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_20"},"flags":{"unlocked":false},"activity":null},{"id":99002021,"package_id":99002,"text":"[基础webp_21]","url":"//i0.hdslb.com/bfs/new_dyn/3819cc0c6a2e402788d68494a9e1f24031484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_21"},"flags":{"unlocked":false},"activity":null},{"id":99002022,"package_id":99002,"text":"[基础webp_22]","url":"//i0.hdslb.com/bfs/new_dyn/a18138a88df52faf671b193b827972fb31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_22"},"flags":{"unlocked":false},"activity":null},{"id":99002023,"package_id":99002,"text":"[基础webp_23]","url":"//i0.hdslb.com/bfs/new_dyn/c7912c71da9fe0cf94f04d4de7789cb431484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_23"},"flags":{"unlocked":false},"activity":null},{"id":99002024,"package_id":99002,"text":"[基础webp_24]","url":"//i0.hdslb.com/bfs/new_dyn/2efc87f225c484c2381ca36fe427c18831484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"基础webp_24"},"flags":{"unlocked":false},"activity":null}]},{"id":99003,"text":"椿webp","url":"//i0.hdslb.com/bfs/new_dyn/32dddb0250e6e5b6417ea5834c6f0adc31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2},"emote":[{"id":99003001,"package_id":99003,"text":"[椿webp_1]","url":"//i0.hdslb.com/bfs/new_dyn/32dddb0250e6e5b6417ea5834c6f0adc31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_1"},"flags":{"unlocked":false},"activity":null},{"id":99003002,"package_id":99003,"text":"[椿webp_2]","url":"//i0.hdslb.com/bfs/new_dyn/7700fafedea0fd77b6f8c0b6e9bccd9d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_2"},"flags":{"unlocked":false},"activity":null},{"id":99003003,"package_id":99003,"text":"[椿webp_3]","url":"//i0.hdslb.com/bfs/new_dyn/86dbd1601221cb5c94e7640fce52f7da31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_3"},"flags":{"unlocked":false},"activity":null},{"id":99003004,"package_id":99003,"text":"[椿webp_4]","url":"//i0.hdslb.com/bfs/new_dyn/14953d4134a23004cb217ff5e3f6200931484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_4"},"flags":{"unlocked":false},"activity":null},{"id":99003005,"package_id":99003,"text":"[椿webp_5]","url":"//i0.hdslb.com/bfs/new_dyn/5d13b56f5034599ec52f3f3f3a208ae231484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_5"},"flags":{"unlocked":false},"activity":null},{"id":99003006,"package_id":99003,"text":"[椿webp_6]","url":"//i0.hdslb.com/bfs/new_dyn/945afbf51f51bbed124c295252dbecd831484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_6"},"flags":{"unlocked":false},"activity":null},{"id":99003007,"package_id":99003,"text":"[椿webp_7]","url":"//i0.hdslb.com/bfs/new_dyn/050b7d1080e1a49e7289b5d9103e2eb431484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_7"},"flags":{"unlocked":false},"activity":null},{"id":99003008,"package_id":99003,"text":"[椿webp_8]","url":"//i0.hdslb.com/bfs/new_dyn/25f770ab4bebe8a7408c780b9f04aee331484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_8"},"flags":{"unlocked":false},"activity":null},{"id":99003009,"package_id":99003,"text":"[椿webp_9]","url":"//i0.hdslb.com/bfs/new_dyn/48f7881e04353d75f36216928502df8431484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_9"},"flags":{"unlocked":false},"activity":null},{"id":99003010,"package_id":99003,"text":"[椿webp_10]","url":"//i0.hdslb.com/bfs/new_dyn/ab9b9558068d7e23cf926accbc8f7ef431484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_10"},"flags":{"unlocked":false},"activity":null},{"id":99003011,"package_id":99003,"text":"[椿webp_11]","url":"//i0.hdslb.com/bfs/new_dyn/da7d6e580e131d95c59101844970408531484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_11"},"flags":{"unlocked":false},"activity":null},{"id":99003012,"package_id":99003,"text":"[椿webp_12]","url":"//i0.hdslb.com/bfs/new_dyn/d3ef8eee6f5b693dc85db7074884ce5f31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_12"},"flags":{"unlocked":false},"activity":null},{"id":99003013,"package_id":99003,"text":"[椿webp_13]","url":"//i0.hdslb.com/bfs/new_dyn/e482fa87e79f40b3dad3acce81bdeefa31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_13"},"flags":{"unlocked":false},"activity":null},{"id":99003014,"package_id":99003,"text":"[椿webp_14]","url":"//i0.hdslb.com/bfs/new_dyn/a5bc1c9e8150cdaa5b94cc7b0066f3fb31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_14"},"flags":{"unlocked":false},"activity":null},{"id":99003015,"package_id":99003,"text":"[椿webp_15]","url":"//i0.hdslb.com/bfs/new_dyn/1ace59312565728342393741c7e28f3731484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_15"},"flags":{"unlocked":false},"activity":null},{"id":99003016,"package_id":99003,"text":"[椿webp_16]","url":"//i0.hdslb.com/bfs/new_dyn/e262f31e7f447d934341a2c4b95076a331484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_16"},"flags":{"unlocked":false},"activity":null},{"id":99003017,"package_id":99003,"text":"[椿webp_17]","url":"//i0.hdslb.com/bfs/new_dyn/f5fd0a338d502ccdfdae398b012207dc31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_17"},"flags":{"unlocked":false},"activity":null},{"id":99003018,"package_id":99003,"text":"[椿webp_18]","url":"//i0.hdslb.com/bfs/new_dyn/947f62fbce237dbaae7c22b302ac0d0831484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_18"},"flags":{"unlocked":false},"activity":null},{"id":99003019,"package_id":99003,"text":"[椿webp_19]","url":"//i0.hdslb.com/bfs/new_dyn/07e044fdeb545c37da0f22f35c886e7d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_19"},"flags":{"unlocked":false},"activity":null},{"id":99003020,"package_id":99003,"text":"[椿webp_20]","url":"//i0.hdslb.com/bfs/new_dyn/418e3169ed3a91e63ff5a54975c79d9f31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_20"},"flags":{"unlocked":false},"activity":null},{"id":99003021,"package_id":99003,"text":"[椿webp_21]","url":"//i0.hdslb.com/bfs/new_dyn/583dc035f7ae999f6203c45c8280984d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_21"},"flags":{"unlocked":false},"activity":null},{"id":99003022,"package_id":99003,"text":"[椿webp_22]","url":"//i0.hdslb.com/bfs/new_dyn/70029cca9149d50300faa06605a6865d31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_22"},"flags":{"unlocked":false},"activity":null},{"id":99003023,"package_id":99003,"text":"[椿webp_23]","url":"//i0.hdslb.com/bfs/new_dyn/9df6ba48f49db47863aed719b658f8f231484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_23"},"flags":{"unlocked":false},"activity":null},{"id":99003024,"package_id":99003,"text":"[椿webp_24]","url":"//i0.hdslb.com/bfs/new_dyn/efa19c548e7c6ffdda8b3dc5272ec82c31484761.webp","mtime":1752929600,"type":3,"attr":0,"meta":{"size":2,"suggest":[""],"alias":"椿webp_24"},"flags":{"unlocked":false},"activity":null}]}]';
        let packs = null;
        try { packs = JSON.parse(PACKS_JSON); } catch (e) { packs = []; }
        return { packs };
    })();

    // ===================================================================
    // BB.Config —— 默认配置与本地存储
    // ===================================================================
    BB.Config = (function () {
        const KEY = 'BB_biliskin_config_v2';
        const VERSION = '0.6.0';

        const DEFAULT = {
            version: VERSION,
            enabled: { emotes: true, purifier: true, dm: false },
            purifier: {
                levels: { L1: true, L2: false, L3: false }, // 分层开关：默认仅 L1，避免误伤
                enableRegex: false,         // 高级正则屏蔽（默认关）
                customWords: { L1: [], L2: [], L3: [] },
                customRegex: [],            // [{id,pattern,enabled}]
                // 黑名单：命中者其后的评论一律折叠为「已被屏蔽」（支持 UID 或用户名）
                // 一键加入：在某条评论旁点「加入黑名单」即把其作者写进这里。
                blacklist: [],              // [{uid:'123', name:'用户名'}]
                blockMode: 'fold',          // 'fold'=命中即折叠（仅隐藏正文）| 'hide-all'=隐藏整条评论
                filterImageOnly: false,     // 过滤纯图片/笔记评论（无文字内容）
            },
            dm: {
                // 私信屏蔽（message.bilibili.com）：默认关，需手动开启
                keywordBlock: true,         // 关键词命中屏蔽
                keywords: [],              // ['某某词','推广','加微信']
                blacklist: [],              // [{uid, name}] 按发送者屏蔽
                blockRegex: [],             // [{id,pattern,flag,enabled}]
                // 列表页：命中时 true=从会话列表隐藏该会话；false=仅把预览替换为占位文字
                hideHitSession: false,
            },
            emotes: { urls: [] },           // 额外表情包订阅 JSON（每行一个）；内置表情不在此列
        };

        function load() {
            const raw = GM_getValue(KEY, null);
            if (!raw) return JSON.parse(JSON.stringify(DEFAULT));
            let obj;
            try { obj = typeof raw === 'string' ? JSON.parse(raw) : raw; }
            catch (e) { console.warn('[BB] 配置读取失败，使用默认', e); return JSON.parse(JSON.stringify(DEFAULT)); }
            return deepMerge(JSON.parse(JSON.stringify(DEFAULT)), obj);
        }
        function save(cfg) { cfg.version = VERSION; GM_setValue(KEY, cfg); }
        function deepMerge(base, over) {
            for (const k in over) {
                if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])
                    && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) deepMerge(base[k], over[k]);
                else base[k] = over[k];
            }
            return base;
        }
        return { KEY, VERSION, DEFAULT, load, save };
    })();

    // 全局运行时配置（启动时加载一次，各模块引用）
    BB.cfg = BB.Config.load();

    // 哨兵：避免重复初始化
    if (unsafeWindow.__BB_INITED__) return;
    unsafeWindow.__BB_INITED__ = true;

    // ===================================================================
    // 通用工具
    // ===================================================================
    function escapeHtml(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
    function escapeReg(s){return String(s==null?'':s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');}

    // 穿透 OPEN shadow root 的递归 querySelectorAll（新版评论组件全是 open shadow）
    function deepQueryAll(root, selector) {
        const out = [];
        (function walk(node){
            if (!node) return;
            try { if (node.querySelectorAll) out.push.apply(out, Array.from(node.querySelectorAll(selector))); } catch (e) {}
            if (node.shadowRoot) walk(node.shadowRoot);
            if (node.children) for (const ch of node.children) walk(ch);
        })(root);
        return out;
    }
    function deepQuery(root, selector){ return deepQueryAll(root, selector)[0] || null; }

    // SPA 路由变更事件（被各模块监听）
    (function installRouteEvents(){
        ['pushState','replaceState'].forEach(fn => {
            const orig = history[fn];
            history[fn] = function (...a) { const r = orig.apply(this, a); document.dispatchEvent(new CustomEvent('BB:spfvreload')); return r; };
        });
        window.addEventListener('popstate', () => document.dispatchEvent(new CustomEvent('BB:spfvreload')));
        window.addEventListener('hashchange', () => document.dispatchEvent(new CustomEvent('BB:spfvreload')));
        // 后备：标题变化（B站切视频标题会变）
        const watchTitle = () => {
            const titleEl = document.querySelector('title');
            if (!titleEl) return;
            let lastTitle = document.title, titleTimer = null;
            new MutationObserver(() => {
                if (document.title === lastTitle) return;
                lastTitle = document.title;
                clearTimeout(titleTimer);
                titleTimer = setTimeout(() => document.dispatchEvent(new CustomEvent('BB:spfvreload')), 300);
            }).observe(titleEl, { childList: true, subtree: true, characterData: true });
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchTitle);
        else watchTitle();
    })();

    // ===================================================================
    // 全局样式（仅悬浮按钮；屏蔽 UI 用内联样式以便穿透 shadow DOM）
    // ===================================================================
    GM_addStyle(`
#__BB_fab__{position:fixed;right:18px;top:30%;z-index:2147482999;width:44px;height:44px;border-radius:50%;
  background:rgba(0,0,0,.6);backdrop-filter:blur(5px);border:1px solid #d2cab8;
  color:#dab67d;display:flex;align-items:center;justify-content:center;
  font-weight:700;user-select:none;cursor:pointer;transition:box-shadow .2s,transform .15s;font-size:16px}
#__BB_fab__:hover{box-shadow:0 0 12px #c9ac67;transform:scale(1.08)}
`);

    // ===================================================================
    // BB.Net —— 统一响应拦截层
    // ===================================================================
    BB.Net = (function () {
        const interceptors = []; // { match:RegExp, apply(obj) } —— apply 在已 parse 的对象上就地修改

        function register(match, apply) { interceptors.push({ match, apply }); }
        function matches(url) {
            if (!url) return false;
            for (const it of interceptors) if (it.match.test(url)) return true;
            return false;
        }
        // 对所有命中的拦截器，在已 parse 的对象上就地改写
        function applyObject(url, obj) {
            if (!obj) return obj;
            for (const it of interceptors) {
                if (it.match.test(url)) { try { it.apply(obj); } catch (e) { console.warn('[BB] 响应注入失败', url, e); } }
            }
            return obj;
        }
        // 把一段 JSON 文本 parse → 改写 → 重新序列化；不匹配或失败时原样返回
        function rewriteText(url, text) {
            if (typeof text !== 'string' || !matches(url)) return text;
            let obj;
            try { obj = JSON.parse(text); } catch (e) { return text; }
            applyObject(url, obj);
            try { return JSON.stringify(obj); } catch (e) { return text; }
        }

        // ---- XHR：捕获 open 的 url，重写 responseText / response 的 getter ----
        (function installXHR() {
            const X = unsafeWindow.XMLHttpRequest;
            if (!X || !X.prototype) return;
            const proto = X.prototype;
            const origOpen = proto.open;
            proto.open = function (method, url) { this.__BB_url = url; return origOpen.apply(this, arguments); };

            function wrapGetter(name) {
                const desc = Object.getOwnPropertyDescriptor(proto, name);
                if (!desc || !desc.get) return;
                const origGet = desc.get;
                const def = {
                    configurable: true,
                    enumerable: desc.enumerable,
                    get() {
                        const v = origGet.call(this);
                        try {
                            if (this.readyState !== 4 || !this.__BB_url || !matches(this.__BB_url)) return v;
                            if (typeof v === 'string') {
                                // responseText（或 responseType='' 的 response）：字符串改写，按实例缓存
                                if (this.__BB_rw === undefined) this.__BB_rw = rewriteText(this.__BB_url, v);
                                return this.__BB_rw;
                            }
                            if (v && typeof v === 'object') {
                                // responseType='json'：已 parse 的对象，就地改写（幂等守卫）
                                if (!v.__BB_injected__) {
                                    try { Object.defineProperty(v, '__BB_injected__', { value: 1, enumerable: false }); } catch (e) {}
                                    applyObject(this.__BB_url, v);
                                }
                            }
                        } catch (e) { /* 读取异常时原样放行 */ }
                        return v;
                    },
                };
                if (desc.set) def.set = desc.set;
                try { Object.defineProperty(proto, name, def); } catch (e) {}
            }
            wrapGetter('responseText');
            wrapGetter('response');
        })();

        // ---- fetch：仅对命中的 URL 包装 Response，重写 .text()/.json() ----
        (function installFetch() {
            if (!unsafeWindow.fetch) return;
            const origFetch = unsafeWindow.fetch;
            unsafeWindow.fetch = function (input, init) {
                const url = typeof input === 'string' ? input : (input && input.url) || '';
                const p = origFetch.apply(this, arguments);
                if (!matches(url)) return p; // 不命中：原样返回，零开销
                return p.then(response => {
                    try {
                        const origText = response.text.bind(response);
                        const origJson = response.json.bind(response);
                        try { Object.defineProperty(response, 'text', { configurable: true, value: async function () { return rewriteText(url, await origText()); } }); } catch (e) {}
                        try { Object.defineProperty(response, 'json', { configurable: true, value: async function () { return applyObject(url, await origJson()); } }); } catch (e) {}
                    } catch (e) { /* skip */ }
                    return response;
                });
            };
        })();

        // ---- JSONP：劫持 callback，先改写再交给原回调 ----
        (function installJSONP() {
            const start = () => {
                const mo = new MutationObserver(muts => {
                    for (const m of muts) for (const n of m.addedNodes) {
                        if (n.nodeType !== 1 || n.localName !== 'script' || !n.src) continue;
                        if (!n.src.includes('//api.bilibili.com') || !matches(n.src)) continue;
                        const mc = n.src.match(/[?&]callback=([^&]+)/);
                        if (!mc) continue;
                        const cb = mc[1], origin = unsafeWindow[cb];
                        if (typeof origin !== 'function') continue;
                        const src = n.src;
                        unsafeWindow[cb] = function (v) { try { applyObject(src, v); } catch (e) {} return origin.apply(this, arguments); };
                    }
                });
                mo.observe(document.documentElement, { childList: true, subtree: true });
            };
            if (document.documentElement) start();
            else document.addEventListener('DOMContentLoaded', start);
        })();

        return { register };
    })();

    // ===================================================================
    // BB.Purifier —— 评论屏蔽词系统
    // ===================================================================
    BB.Purifier = (function (cfg, builtin) {
        // 新版评论组件的自定义标签名（视频/动态/番剧均使用这几个 web components）
        const COMMENT_HOSTS = ['bili-comment-renderer', 'bili-comment-thread-renderer', 'bili-comment-reply-renderer'];
        const RICH_HOST = 'bili-rich-text';
        const LEGACY_SELECTORS = ['.reply-item', '.comment-item', '.root-reply'];

        // —— 词库 / 正则（预编译缓存，配置变更后 invalidate） ——
        let _matchers = null;   // {L1:{cjk[],alphaRe},...}
        let _regexCache = null;

        function buildMatchers() {
            const out = {};
            ['L1','L2','L3'].forEach(lv => {
                const words = new Set(builtin[lv] || []);
                (cfg.purifier.customWords[lv] || []).forEach(w => words.add(w));
                const cjk = [], alpha = [];
                words.forEach(w => { if (!w) return; (/[a-zA-Z]/.test(w) ? alpha : cjk).push(w); });
                out[lv] = {
                    cjk,
                    alphaRe: alpha.length ? new RegExp('(^|[^a-zA-Z])(' + alpha.map(escapeReg).join('|') + ')([^a-zA-Z]|$)', 'i') : null,
                };
            });
            return out;
        }
        function getMatchers() { if (!_matchers) _matchers = buildMatchers(); return _matchers; }

        function getRegexRules() {
            if (_regexCache) return _regexCache;
            const rules = [];
            if (cfg.purifier.enableRegex) {
                builtin.regex.forEach(r => {
                    const enabled = (cfg.purifier.customRegex || []).some(x => x.id === r.id && x.enabled);
                    if (enabled) { try { rules.push(new RegExp(r.pattern, 'i')); } catch (e) { console.warn('[BB] 正则编译失败', r.id, e); } }
                });
            }
            (cfg.purifier.customRegex || []).forEach(x => {
                if (x.enabled && x.pattern && !builtin.regex.some(b => b.id === x.id)) {
                    try { rules.push(new RegExp(x.pattern, x.flag || 'i')); } catch (e) { /* ignore */ }
                }
            });
            _regexCache = rules;
            return rules;
        }
        function invalidate() { _matchers = null; _regexCache = null; _blMap = null; }

        // —— 黑名单：命中者其后的评论一律折叠为「已被屏蔽」——
        //   支持 UID（精确）或用户名（回退，用于旧版评论无 UID 时）。
        //   一键加入：在被屏蔽评论旁点「加入黑名单」即把其作者写进 cfg.purifier.blacklist。
        let _blMap = null; // { uid:Set, name:Set }
        function getBlacklistMap() {
            if (_blMap) return _blMap;
            const uids = new Set(), names = new Set();
            (cfg.purifier.blacklist || []).forEach(b => {
                if (!b) return;
                if (b.uid) uids.add(String(b.uid));
                if (b.name) names.add(String(b.name));
            });
            _blMap = { uids, names };
            return _blMap;
        }
        function blacklistHit(uid, name) {
            const m = getBlacklistMap();
            if (uid && m.uids.has(String(uid))) return { trigger: 'UID:' + uid };
            if (name && m.names.has(String(name))) return { trigger: '用户:' + name };
            return null;
        }
        function addBlacklist(uid, name) {
            if (!uid && !name) return;
            const list = cfg.purifier.blacklist = cfg.purifier.blacklist || [];
            const u = uid ? String(uid) : '', n = name ? String(name) : '';
            if (list.some(b => String(b.uid) === u && String(b.name) === n)) return;
            list.push({ uid: u, name: n });
            _blMap = null;
            BB.Config.save(cfg);
        }
        function removeBlacklist(uid, name) {
            const list = cfg.purifier.blacklist = cfg.purifier.blacklist || [];
            const u = uid ? String(uid) : '', n = name ? String(name) : '';
            cfg.purifier.blacklist = list.filter(b => !(String(b.uid) === u && String(b.name) === n));
            _blMap = null;
            BB.Config.save(cfg);
        }

        // 命中返回 {level, trigger}，未命中返回 null
        function matchLevel(text) {
            if (!text) return null;
            const M = getMatchers();
            for (const lv of ['L1','L2','L3']) {
                if (!cfg.purifier.levels[lv]) continue;
                const m = M[lv];
                for (const w of m.cjk) if (text.includes(w)) return { level: lv, trigger: w };
                if (m.alphaRe) { const mm = text.match(m.alphaRe); if (mm) return { level: lv, trigger: mm[2] }; }
            }
            for (const re of getRegexRules()) if (re.test(text)) return { level: 'L2', trigger: '正则规则' };
            return null;
        }

        // —— 读取 renderer 的富文本（#contents）与作者 UID ——
        //   bili-comment-renderer 的 shadow 里有直接的 bili-rich-text；
        //   bili-comment-thread-renderer 可能嵌套了一层 bili-comment-renderer，需穿透查找。
        function findRich(renderer) {
            if (!renderer || !renderer.shadowRoot) return null;
            let rich = renderer.shadowRoot.querySelector(RICH_HOST) || deepQuery(renderer.shadowRoot, RICH_HOST);
            // 穿透嵌套：如果 renderer 本身没有 bili-rich-text，尝试在里面找到 bili-comment-renderer 再取 rich
            if (!rich && renderer.tagName === 'BILI-COMMENT-THREAD-RENDERER') {
                const inner = deepQuery(renderer.shadowRoot, 'bili-comment-renderer');
                if (inner && inner.shadowRoot) {
                    rich = inner.shadowRoot.querySelector(RICH_HOST) || deepQuery(inner.shadowRoot, RICH_HOST);
                }
            }
            if (!rich || !rich.shadowRoot) return null;
            const contents = rich.shadowRoot.querySelector('#contents');
            return contents ? { rich, sr: rich.shadowRoot, contents } : null;
        }
        function readText(contents) { return (contents.textContent || '').replace(/\s+/g, ' ').trim(); }
        function readUid(renderer) {
            try {
                const d = renderer.data;
                if (d) { const mid = (d.member && d.member.mid) || d.mid || (d.reply && d.reply.mid); if (mid) return String(mid); }
            } catch (e) {}
            // 嵌套 renderer 可能没有 data，通过 bili-comment-user-info 获取
            const u = deepQuery(renderer, 'bili-comment-user-info');
            if (u) { try { const ud = u.data; if (ud && (ud.mid || (ud.member && ud.member.mid))) return String(ud.mid || ud.member.mid); } catch (e) {} }
            // bili-comment-thread-renderer：尝试从它的 reply 属性（JSON string）解析 mid
            if (renderer.hasAttribute && renderer.hasAttribute('reply')) {
                try { const r = JSON.parse(renderer.getAttribute('reply')); const mid = r && (r.mid || (r.member && r.member.mid)); if (mid) return String(mid); } catch (e) {}
            }
            return '';
        }
        // 读取作者用户名（用于黑名单按名命中 / 「加入黑名单」时写入名）
        function readName(renderer) {
            try {
                const d = renderer.data;
                if (d) {
                    const m = d.member || (d.reply && d.reply.member);
                    if (m) { const n = m.uname || m.name; if (n) return String(n); }
                }
            } catch (e) {}
            const u = deepQuery(renderer, 'bili-comment-user-info');
            if (u) {
                try { const ud = u.data; const m = ud && (ud.member || ud); if (m) { const n = m.uname || m.name; if (n) return String(n); } } catch (e) {}
            }
            // 从 reply 属性（bili-comment-thread-renderer）解析用户名
            if (renderer.hasAttribute && renderer.hasAttribute('reply')) {
                try { const r = JSON.parse(renderer.getAttribute('reply')); const m = r && (r.member || r); if (m) { const n = m.uname || m.name; if (n) return String(n); } } catch (e) {}
            }
            // 旧版：取用户名链接文本
            try {
                const a = deepQuery(renderer, '.root-reply .reply-decorate, .user-name, a[data-usercard-mid]');
                if (a && (a.textContent || '').trim()) return (a.textContent || '').trim();
            } catch (e) {}
            return '';
        }
        function makeBlockedBar(triggerTxt, onToggle) {
            const bar = document.createElement('div');
            bar.style.cssText = 'display:flex;align-items:center;flex-wrap:wrap;gap:8px;color:#94969a;' +
                'font-style:italic;padding:4px 8px;background:rgba(128,128,128,.08);border-radius:6px;' +
                'font-size:13px;line-height:1.6;margin:2px 0;';
            const t = document.createElement('span');
            t.textContent = '该内容已被屏蔽';
            bar.appendChild(t);
            if (triggerTxt) {
                const tr = document.createElement('span');
                tr.textContent = '（触发：' + triggerTxt + '）';
                tr.style.cssText = 'color:#b0b3b8;font-size:12px;font-style:normal;';
                bar.appendChild(tr);
            }
            const a = document.createElement('a');
            a.href = 'javascript:void(0)';
            a.dataset.BBShown = '0';   // 0=当前折叠中，按钮显示「显示原文」；1=当前展开中
            a.textContent = '显示原文';
            a.title = '点击显示原评论（再次点击隐藏）';
            a.style.cssText = 'color:#c9ac67;cursor:pointer;font-style:normal;text-decoration:none;' +
                'border-bottom:1px dashed #c9ac67;white-space:nowrap;margin-left:auto;';
            a.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const wantShow = a.dataset.BBShown !== '1';
                try { onToggle(wantShow); } catch (err) {}
                a.dataset.BBShown = wantShow ? '1' : '0';
                a.textContent = wantShow ? '隐藏原文' : '显示原文';
                a.title = wantShow ? '点击重新屏蔽（再次点击显示）' : '点击显示原评论（再次点击隐藏）';
            });
            bar.appendChild(a);
            return bar;
        }
        function blockRich(renderer, richCtx, info, author) {
            if (renderer.dataset.BBBlocked) return;
            // 先注入统一的「拉黑」徽章（在内容隐藏前挂到用户名左侧）
            injectBlacklistBtn(renderer, author);
            renderer.dataset.BBBlocked = '1';
            const mode = cfg.purifier.blockMode === 'hide-all' ? 'hide-all' : 'fold';
            const { sr, contents } = richCtx;
            const prevDisplay = contents.style.display || '';
            if (mode === 'fold') {
                contents.style.display = 'none';
                const bar = makeBlockedBar((info && info.trigger) || '', show => {
                    contents.style.display = show ? prevDisplay : 'none';
                });
                sr.appendChild(bar);
            } else {
                // hide-all：隐藏整个 renderer 宿主元素，在同级 light DOM 插入占位条
                // bar 始终可见，渲染在 renderer 上方；toggle 只控制 renderer 显隐。
                const prevRendererDisplay = renderer.style.display || '';
                renderer.style.display = 'none';
                const barContainer = document.createElement('div');
                barContainer.style.margin = '8px 0';
                const bar = makeBlockedBar((info && info.trigger) || '', show => {
                    renderer.style.display = show ? prevRendererDisplay : 'none';
                });
                barContainer.appendChild(bar);
                if (renderer.parentNode) renderer.parentNode.insertBefore(barContainer, renderer);
            }
        }

        // —— 命中判定 + 执行屏蔽（新版） ——
        function evaluate(renderer, richCtx) {
            const author = { uid: readUid(renderer), name: readName(renderer) };
            const blHit = blacklistHit(author.uid, author.name);
            if (blHit) return applyBlock(renderer, richCtx, blHit, author);
            const text = readText(richCtx.contents);
            // 纯图片/笔记评论检测：is_note_v2 && 无文字
            if (cfg.purifier.filterImageOnly && isImageOnly(renderer)) {
                return applyBlock(renderer, richCtx, { trigger: '纯图片评论（无文字）' }, author);
            }
            if (!text) return injectBlacklistBtn(renderer, author);
            const hit = matchLevel(text);
            if (!hit) return injectBlacklistBtn(renderer, author);
            return applyBlock(renderer, richCtx, hit, author);
        }
        function applyBlock(renderer, richCtx, hit, author) {
            blockRich(renderer, richCtx, hit, author);
            return true;
        }

        function isImageOnly(renderer) {
            try {
                // 数据层：is_note_v2 且 content.message 为空或只有空白
                const data = renderer.data;
                if (data && data.reply_control && data.reply_control.is_note_v2) {
                    const msg = (data.content && data.content.message || '').replace(/\s+/g, '').trim();
                    if (!msg) return true;
                }
                // DOM 层：有 bili-comment-pictures-renderer 但没有文字的 #contents
                const sr = renderer.shadowRoot;
                if (sr) {
                    const hasPictureEl = sr.querySelector('bili-comment-pictures-renderer') ||
                        deepQuery(sr, 'bili-comment-pictures-renderer');
                    if (hasPictureEl) {
                        const rich = sr.querySelector(RICH_HOST) || deepQuery(sr, RICH_HOST);
                        if (rich && rich.shadowRoot) {
                            const ct = rich.shadowRoot.querySelector('#contents');
                            if (ct && !(ct.textContent || '').replace(/\s+/g, '').trim()) return true;
                        }
                    }
                }
            } catch (e) { /* ignore */ }
            return false;
        }

        // 在所有评论的 renderer shadow DOM 中注入统一的「拉黑」徽章（用户名左侧，带底色）
        function injectBlacklistBtn(renderer, author) {
            if (!renderer || renderer.dataset.BBHasBlBtn) return;
            if (!author || (!author.uid && !author.name)) return;
            renderer.dataset.BBHasBlBtn = '1';

            // 对 bili-comment-thread-renderer，找内层的 bili-comment-renderer
            let targetRenderer = renderer;
            if (renderer.tagName === 'BILI-COMMENT-THREAD-RENDERER') {
                const inner = deepQuery(renderer.shadowRoot, 'bili-comment-renderer');
                if (inner) targetRenderer = inner;
            }
            const sr = targetRenderer.shadowRoot;
            if (!sr) return;

            // 找用户名元素（B站 web component 里用户名通常是一个带 space 链接的 <a>）
            const nameAnchor =
                sr.querySelector('a[href*="space.bilibili.com"]') ||
                sr.querySelector('a[data-usercard-mid]') ||
                [...sr.querySelectorAll('a')].find(a => {
                    try { return (a.textContent || '').trim() === (author.name || ''); } catch (e) { return false; }
                });

            // 黑名单持久化：刷新后若该用户已在黑名单，直接显示「已拉黑」灰色态
            const alreadyBlacklisted = blacklistHit(author.uid, author.name);

            const badge = document.createElement('span');
            badge.textContent = alreadyBlacklisted ? '已拉黑' : '拉黑';
            badge.title = alreadyBlacklisted
                ? (author.name || 'UID:' + author.uid) + ' 已在黑名单中'
                : '把 ' + (author.name || 'UID:' + author.uid) + ' 加入黑名单，屏蔽其后续评论';
            if (alreadyBlacklisted) {
                badge.style.cssText = 'display:inline-block;margin-right:6px;padding:1px 6px;' +
                    'background:rgba(128,128,128,.2);color:#888;border-radius:4px;' +
                    'font-size:11px;font-weight:600;line-height:1.6;' +
                    'user-select:none;border:1px solid rgba(128,128,128,.2);pointer-events:none;';
            } else {
                badge.style.cssText = 'display:inline-block;margin-right:6px;padding:1px 6px;' +
                    'background:rgba(251,114,153,.18);color:#fb7299;border-radius:4px;' +
                    'cursor:pointer;font-size:11px;font-weight:600;line-height:1.6;' +
                    'user-select:none;border:1px solid rgba(251,114,153,.3);';
                badge.addEventListener('click', e => {
                    e.preventDefault(); e.stopPropagation();
                    addBlacklist(author.uid || '', author.name || '');
                    badge.textContent = '已拉黑';
                    badge.style.background = 'rgba(128,128,128,.2)';
                    badge.style.color = '#888';
                    badge.style.borderColor = 'rgba(128,128,128,.2)';
                    badge.style.pointerEvents = 'none';
                });
            }

            if (nameAnchor && nameAnchor.parentNode) {
                nameAnchor.parentNode.insertBefore(badge, nameAnchor);
            } else if (sr.firstChild) {
                sr.insertBefore(badge, sr.firstChild);
            } else {
                sr.appendChild(badge);
            }
        }

        // —— 共享轮询：等每个 renderer 的 #contents 文本就绪后评估 ——
        //   lit 异步填文本，且外部 MutationObserver 看不到 shadow 内部变化，
        //   因此用一个共享定时器逐个等待，避免给每个评论各开一个定时器。
        const pending = new Set();
        let timer = null;
        const POLL_INTERVAL = 150, MAX_TRIES = 40; // ~6s 上限

        function schedule(renderer) {
            if (!renderer || renderer.nodeType !== 1) return;
            if (renderer.dataset.BBChecked || renderer.dataset.BBBlocked) return;
            // 跳过嵌套在另一个 COMMENT_HOSTS shadow 里的内部 renderer，
            // 外层宿主已经覆盖了它（否则同一条评论会被评估两次）。
            const root = renderer.getRootNode();
            if (root && root.host) {
                const hostTag = (root.host.tagName || '').toLowerCase();
                if (COMMENT_HOSTS.includes(hostTag)) return;
            }
            renderer.dataset.BBChecked = '1';
            pending.add({ el: renderer, tries: 0 });
            if (!timer) { timer = setInterval(tick, POLL_INTERVAL); }
        }
        function tick() {
            if (!pending.size) { clearInterval(timer); timer = null; return; }
            for (const rec of Array.from(pending)) {
                const r = rec.el;
                if (!r.isConnected || r.dataset.BBBlocked) { pending.delete(rec); continue; }
                const richCtx = findRich(r);
                const hasText = richCtx && readText(richCtx.contents);
                // 如果没找到 rich-text，尝试多等几轮（动态页评论区内容可能懒加载较慢）
                if (!richCtx && rec.tries < 15) { rec.tries++; continue; }
                // 文本就绪即可评估；黑名单按 UID 命中时多等一会儿 data（中期后仍无 data 也放行）
                const blHasUids = getBlacklistMap().uids.size > 0;
                const uidReady = !blHasUids || !!readUid(r) || rec.tries > 8;
                // 黑名单用户 / 纯图片评论即使无文字也要评估
                if (richCtx && uidReady) {
                    const hasText = richCtx && readText(richCtx.contents);
                    if (hasText) { pending.delete(rec); evaluate(r, richCtx); continue; }
                    // 无文字但可能是黑名单或纯图片评论，尝试评估
                    const blHit = getBlacklistMap().uids.size > 0 && blacklistHit(readUid(r), readName(r));
                    const imgHit = cfg.purifier.filterImageOnly && isImageOnly(r);
                    if (blHit || imgHit) { pending.delete(rec); evaluate(r, richCtx); continue; }
                }
                if (richCtx && hasText && uidReady) { pending.delete(rec); evaluate(r, richCtx); continue; }
                if (++rec.tries > MAX_TRIES) pending.delete(rec);
            }
        }

        // —— 旧版普通 DOM（.reply-item 等）——
        function processLegacy(node) {
            if (!node || node.dataset.BBBlocked || node.dataset.BBChecked) return;
            node.dataset.BBChecked = '1';
            const target = node.querySelector('.reply-content,.text-con,.root-reply .reply-content,.reply-content .text');
            if (!target || !(target.textContent || '').trim()) return;

            const author = { uid: readUid(node), name: readName(node) };
            const mode = cfg.purifier.blockMode === 'hide-all' ? 'hide-all' : 'fold';
            const doBlock = (info) => {
                if (node.dataset.BBBlocked) return;
                // 先在用户名左侧挂上统一的「拉黑」徽章
                injectLegacyBlBtn(node, author);
                node.dataset.BBBlocked = '1';
                if (mode === 'hide-all') {
                    // 隐藏整条评论节点（含头像/昵称/内容），在同级插入占位条
                    // bar 始终可见，toggle 只控制评论节点显隐。
                    node.style.display = 'none';
                    const barContainer = document.createElement('div');
                    barContainer.style.margin = '8px 0';
                    const bar = makeBlockedBar((info && info.trigger) || '', show => {
                        node.style.display = show ? '' : 'none';
                    });
                    barContainer.appendChild(bar);
                    if (node.parentNode) node.parentNode.insertBefore(barContainer, node);
                } else {
                    // fold：备份原文（含表情图等子节点），供「显示原文」恢复
                    const originalClone = target.cloneNode(true);
                    const renderBlocked = () => {
                        target.textContent = '';
                        const bar = makeBlockedBar((info && info.trigger) || '', show => {
                            if (show) {
                                target.textContent = '';
                                target.appendChild(originalClone.cloneNode(true));
                            } else {
                                renderBlocked();
                            }
                        });
                        target.appendChild(bar);
                    };
                    renderBlocked();
                }
            };

            const blHit = blacklistHit(author.uid, author.name);
            if (blHit) { doBlock(blHit); return; }
            const hit = matchLevel((target.textContent || '').replace(/\s+/g, ' ').trim());
            if (hit) doBlock(hit);
            // 未命中则注入拉黑徽章
            injectLegacyBlBtn(node, author, target);
        }

        // 旧版评论统一「拉黑」徽章（放在用户名左侧，带底色）
        function injectLegacyBlBtn(node, author, target) {
            if (!node || node.dataset.BBHasBlBtn) return;
            if (!author || (!author.uid && !author.name)) return;
            node.dataset.BBHasBlBtn = '1';

            // 黑名单持久化：刷新后若该用户已在黑名单，直接显示「已拉黑」灰色态
            const alreadyBlacklisted = blacklistHit(author.uid, author.name);

            const blBtn = document.createElement('span');
            blBtn.textContent = alreadyBlacklisted ? '已拉黑' : '拉黑';
            blBtn.title = alreadyBlacklisted
                ? (author.name || 'UID:' + author.uid) + ' 已在黑名单中'
                : '把 ' + (author.name || 'UID:' + author.uid) + ' 加入黑名单，屏蔽其后续评论';
            if (alreadyBlacklisted) {
                blBtn.style.cssText = 'display:inline-block;margin-right:6px;padding:1px 6px;' +
                    'background:rgba(128,128,128,.2);color:#888;border-radius:4px;' +
                    'font-size:11px;font-weight:600;line-height:1.6;' +
                    'user-select:none;border:1px solid rgba(128,128,128,.2);pointer-events:none;';
            } else {
                blBtn.style.cssText = 'display:inline-block;margin-right:6px;padding:1px 6px;' +
                    'background:rgba(251,114,153,.18);color:#fb7299;border-radius:4px;' +
                    'cursor:pointer;font-size:11px;font-weight:600;line-height:1.6;' +
                    'user-select:none;border:1px solid rgba(251,114,153,.3);';
                blBtn.addEventListener('click', e => {
                    e.preventDefault(); e.stopPropagation();
                    addBlacklist(author.uid || '', author.name || '');
                    blBtn.textContent = '已拉黑';
                    blBtn.style.background = 'rgba(128,128,128,.2)';
                    blBtn.style.color = '#888';
                    blBtn.style.borderColor = 'rgba(128,128,128,.2)';
                    blBtn.style.pointerEvents = 'none';
                });
            }
            // 放在用户名链接之前（如果 DOM 里有的话）
            const nameLink = node.querySelector('a[data-usercard-mid], a[href*="space.bilibili.com"], .user-name, .reply-decorate');
            if (target && nameLink && nameLink.parentNode) {
                nameLink.parentNode.insertBefore(blBtn, nameLink);
            } else if (target) {
                target.insertBefore(blBtn, target.firstChild);
            } else if (node.firstChild) {
                node.insertBefore(blBtn, node.firstChild);
            }
        }

        // —— 全量扫描（穿透 shadow，schedule 内部去重） ——
        function scan() {
            COMMENT_HOSTS.forEach(tag => deepQueryAll(document, tag).forEach(schedule));
            for (const sel of LEGACY_SELECTORS) document.querySelectorAll(sel).forEach(processLegacy);
        }
        const scanDebounced = (() => {
            let t = null;
            return () => { clearTimeout(t); t = setTimeout(scan, 250); };
        })();

        function startObserver() {
            // light DOM 里 bili-comments / renderer 出现时触发一次扫描；
            // shadow 内部新增的 renderer 由下方 interval 兜底。
            new MutationObserver(scanDebounced).observe(document.documentElement, { childList: true, subtree: true });
            // 动态页评论区可能在 #app 内异步渲染，额外监听 B站 主容器
            const appRoot = document.getElementById('app') || document.getElementById('i_cecream');
            if (appRoot) new MutationObserver(scanDebounced).observe(appRoot, { childList: true, subtree: true });
            setInterval(scan, 2500); // 兜底：捕捉 shadow 内部异步新增的 renderer
        }

        function init() {
            if (!cfg.enabled.purifier) return;
            const boot = () => { scan(); startObserver(); };
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
            else boot();
            document.addEventListener('BB:spfvreload', scanDebounced);
        }

        return {
            init, scan, matchLevel, invalidate,
            refresh() { invalidate(); scan(); },
            getBlacklist: () => cfg.purifier.blacklist || [],
            addBlacklist, removeBlacklist,
            exportBlocklist() {
                const toArr = lv => { const s = new Set(builtin[lv] || []); (cfg.purifier.customWords[lv] || []).forEach(w => s.add(w)); return Array.from(s); };
                return {
                    L1: toArr('L1'), L2: toArr('L2'), L3: toArr('L3'),
                    regex: builtin.regex.map(r => ({ id: r.id, pattern: r.pattern })),
                    customRegex: cfg.purifier.customRegex,
                    blacklist: cfg.purifier.blacklist || [],
                };
            },
        };
    })(BB.cfg, BB.BuiltinBlocklist);

    // ===================================================================
    // BB.DM —— 私信屏蔽
    // ===================================================================
    BB.DM = (function (cfg) {
        const DM = cfg.dm || {};
        // 文字类消息（可见文本在 content.content）：1 文字 / 5 撤回&系统提示 / 10 表情 / 11 表情
        const TEXT_MSG_TYPES = new Set([1, 5, 10, 11, 17, 18, 19, 20, 21]);

        const PLACEHOLDER = '（该消息已被屏蔽）';
        const SESSION_PLACEHOLDER = '（该会话含被屏蔽消息）';

        // —— 黑名单：按发送者 UID（精确）或用户名（若有）命中屏蔽 ——
        let _blMap = null; // { uid:Set, name:Set }
        function getBlacklistMap() {
            if (_blMap) return _blMap;
            const uids = new Set(), names = new Set();
            (DM.blacklist || []).forEach(b => { if (!b) return; if (b.uid) uids.add(String(b.uid)); if (b.name) names.add(String(b.name)); });
            _blMap = { uids, names };
            return _blMap;
        }
        function blacklistHit(uid, name) {
            const m = getBlacklistMap();
            if (uid && m.uids.has(String(uid))) return true;
            if (name && m.names.has(String(name))) return true;
            return false;
        }
        function invalidate() { _blMap = null; _reCache = null; }

        let _reCache = null;
        function getRegexRules() {
            if (_reCache) return _reCache;
            const rules = [];
            (DM.blockRegex || []).forEach(x => {
                if (x.enabled && x.pattern) { try { rules.push(new RegExp(getRegExpBody(x.pattern), x.flag || 'i')); } catch (e) {} }
            });
            _reCache = rules;
            return rules;
        }
        // 去掉正则字面量前后的斜杠（允许用户写 /abc/gi 形式）
        function getRegExpBody(p) {
            const m = String(p).match(/^\/(.+)\/([gimsuy]*)$/);
            return m ? m[1] : p;
        }

        // 取消息可见文本（文字/撤回提示/部分系统消息）
        function msgText(msg) {
            if (!msg || typeof msg.content !== 'string') return '';
            try {
                const parsed = JSON.parse(msg.content);
                if (parsed && typeof parsed === 'object' && 'content' in parsed) return String(parsed.content || '');
            } catch (e) {}
            return '';
        }
        function msgType(msg) { return msg && msg.msg_type; }

        // 命中测试：返回 {reason, trigger} 或 null
        function matchMessage(msg, opts) {
            const sender = String(msg.sender_uid || '');
            // 优先黑名单：命中即屏蔽该发送者的所有消息
            if (blacklistHit(sender)) return { reason: 'bl', trigger: 'UID:' + sender };
            if (!DM.keywordBlock) return null;
            const text = msgText(msg);
            if (!text) return null;
            const kws = DM.keywords || [];
            for (const w of kws) { if (w && text.includes(w)) return { reason: 'kw', trigger: w }; }
            for (const re of getRegexRules()) {
                try { if (re.test(text)) return { reason: 'regex', trigger: '正则规则' }; } catch (e) {}
            }
            return null;
        }

        // 把单条消息改写为占位（始终保留，仅折叠预览为占位文字）
        function blockMessage(msg, m) {
            const placeholderObj = { content: PLACEHOLDER + (m && m.trigger ? '（触发：' + m.trigger + '）' : '') };
            try { msg.content = JSON.stringify(placeholderObj); msg.msg_type = msg.msg_type || 1; }
            catch (e) { msg.content = JSON.stringify(placeholderObj); }
            return true;
        }

        // —— 会话列表（get_sessions / new_sessions）——
        function processSessionList(data) {
            if (!data || !Array.isArray(data.session_list)) return;
            const kept = [];
            for (const s of data.session_list) {
                if (!s) { kept.push(s); continue; }
                // 1) 黑名单 hit：发送者 talker_id 命中
                const talker = String(s.talker_id || '');
                const sessionName = (s.account_info && s.account_info.name) || s.group_name || '';
                let hit = blacklistHit(talker, sessionName);
                // 2) last_msg 关键词 / 正则命中
                let trigger = hit ? ('UID:' + talker) : '';
                if (!hit) {
                    const lm = s.last_msg;
                    if (lm) {
                        const lastHit = matchMessage(lm, {});
                        if (lastHit) { hit = true; trigger = lastHit.trigger; }
                    }
                }
                if (hit) {
                    if (DM.hideHitSession) continue; // whole-session drop
                    // 仅替换预览：把 last_msg 改写为占位
                    if (s.last_msg) {
                        const ph = { content: SESSION_PLACEHOLDER + (trigger ? '（触发：' + trigger + '）' : '') };
                        try { s.last_msg.content = JSON.stringify(ph); s.last_msg.msg_type = s.last_msg.msg_type || 1; } catch (e) {}
                        try { s.unread_count = 0; } catch (e) {}
                    }
                    kept.push(s);
                } else kept.push(s);
            }
            data.session_list = kept;
        }

        // —— 单会话消息列表（fetch_session_msgs）——
        function processMessageList(data) {
            if (!data || !Array.isArray(data.messages)) return;
            for (const msg of data.messages) {
                if (!msg) continue;
                const m = matchMessage(msg, {});
                if (m) blockMessage(msg, m); // 始终保留，仅折叠为占位文字
            }
        }

        function registerInterceptors() {
            // 会话列表
            BB.Net.register(/api\.vc\.bilibili\.com\/session_svr\/v1\/session_svr\/(get_sessions|new_sessions)/, j => {
                try { processSessionList(j && j.data); } catch (e) { console.warn('[BB] 私信会话列表处理失败', e); }
            });
            // 单会话消息
            BB.Net.register(/api\.vc\.bilibili\.com\/svr_sync\/v1\/svr_sync\/fetch_session_msgs/, j => {
                try { processMessageList(j && j.data); } catch (e) { console.warn('[BB] 私信消息列表处理失败', e); }
            });
        }

        // DOM 兜底：私信页面有时用 SSR __INITIAL_STATE__ 预渲染首屏会话，
        // 上面靠 fetch 不到。这里对 #message-pc-app 内文本节点做轻量巡检，
        // 把命中关键词的会话/消息 DOM 节点淡化（仅标记，不破坏 v-DOM）。
        // 注意：只作「弱化」不做大改，避免与 Vue render 冲突。
        const DM_TEXT_PROBE = /[一-龥a-zA-Z0-9]/;
        function scanDOM() {
            if (cfg.enabled.dm === false) return;
            const root = document.getElementById('message-pc-app');
            if (!root) return;
            // 会话行：找带文字的列表项。私信页 class 变化频繁，这里只做模糊命中
            const kws = (DM.keywords || []).filter(Boolean);
            if (!DM.keywords || !kws.length) return;
            const hitSel = '.session-list__item, .list-item, [class*="session"] li, li[class*="item"]';
            let nodes = [];
            try { nodes = Array.from(root.querySelectorAll(hitSel)); } catch (e) { return; }
            for (const n of nodes) {
                if (n.dataset.BBDmDim) continue;
                const text = (n.textContent || '').trim();
                if (!text) continue;
                let hit = false;
                for (const w of kws) { if (w && text.includes(w)) { hit = true; break; } }
                if (hit) {
                    n.dataset.BBDmDim = '1';
                    try {
                        n.style.opacity = '0.45';
                        n.style.textDecoration = 'line-through';
                        n.title = '该会话命中私信屏蔽词';
                    } catch (e) {}
                }
            }
        }

        let domInited = false, domTimer = null;
        function startDOMScan() {
            if (domInited) return; domInited = true;
            const boot = () => {
                if (!document.getElementById('message-pc-app')) return false;
                clearInterval(domTimer); domTimer = null;
                scanDOM();
                new MutationObserver(() => scanDOM()).observe(document.getElementById('message-pc-app'), { childList: true, subtree: true });
                document.addEventListener('BB:spfvreload', scanDOM);
                return true;
            };
            if (boot()) return;
            domTimer = setInterval(() => { if (boot()); }, 1500);
            setTimeout(() => clearInterval(domTimer), 20000);
        }

        function init() {
            if (cfg.enabled.dm === false) return;
            const hasBl = (DM.blacklist || []).length > 0;
            if (!DM.keywordBlock && !hasBl) return;
            registerInterceptors();
            startDOMScan();
            console.log('[BB] 私信屏蔽已加载：关键词', (DM.keywords||[]).length, '，黑名单', (DM.blacklist||[]).length);
        }
        return {
            init, invalidate, scanDOM,
            // 仅供自测/面板预览：直接对已 parse 的会话/消息对象应用屏蔽逻辑
            _processSessionList: processSessionList,
            _processMessageList: processMessageList,
        };
    })(BB.cfg);

    // ===================================================================
    // BB.Emotes —— 自定义表情包
    // ===================================================================
    BB.Emotes = (function (cfg) {
        const dictRef = { value: {} };  // '[code]' -> replyEmote
        const chnRef = { value: {} };   // '【中文名】' -> replyEmote
        let packsRef = [];              // 原始 package 列表（供表情面板注入）

        function toReplyEmote(e) {
            return {
                id: e.id, package_id: e.package_id, state: 0, type: 3, attr: 0,
                text: e.text, url: e.url, meta: { size: 2 }, mtime: e.mtime,
                jump_title: (e.meta && e.meta.alias) || e.text,
            };
        }

        // gitee 的 /raw/、/blob/ 链常返回 451，改走 gitee API v5（返回 base64 content）
        function resolveGiteeApi(url) {
            const g = url.match(/^https?:\/\/gitee\.com\/([^/]+)\/([^/]+)\/(?:raw|blob)\/([^/]+)\/(.+)$/);
            return g ? `https://gitee.com/api/v5/repos/${g[1]}/${g[2]}/contents/${g[4]}?ref=${g[3]}` : null;
        }
        function parsePacks(json) {
            if (json.data && json.data.packages) return json.data.packages;
            if (json.data && 'emote' in json.data) return [json.data];
            if (Array.isArray(json.packages)) return json.packages;
            return [];
        }
        function fetchPack(rawUrl) {
            const url = (rawUrl || '').trim();
            if (!url) return Promise.resolve([]);
            const apiUrl = resolveGiteeApi(url);
            const gm = (target) => new Promise(resolve => {
                GM_xmlhttpRequest({
                    url: target, method: 'GET',
                    headers: { 'Accept': 'application/json, text/plain, */*' },
                    onload: d => { try { resolve(d.responseText || ''); } catch (e) { resolve(''); } },
                    onerror: () => resolve(''),
                });
            });
            const decodeGitee = (txt) => {
                try {
                    const api = JSON.parse(txt);
                    if (api && typeof api.content === 'string') {
                        // content 是原始 JSON 的 UTF-8 字节经 base64 后的串；atob 得 latin1，
                        // 必须再用 UTF-8 解码，否则中文标题/别名变乱码（如「斋藤妮可露」→ æè¤å¦®å¯é²）
                        const raw = (api.encoding === 'base64')
                            ? new TextDecoder('utf-8').decode(Uint8Array.from(atob(api.content.replace(/\s+/g, '')), c => c.charCodeAt(0)))
                            : api.content;
                        return parsePacks(JSON.parse(raw));
                    }
                } catch (e) { /* 落到普通解析 */ }
                try { return parsePacks(JSON.parse(txt)); } catch (e) { return []; }
            };

            if (apiUrl) {
                return gm(apiUrl).then(txt => {
                    const packs = decodeGitee(txt);
                    return packs.length ? packs : gm(url).then(t2 => { try { return parsePacks(JSON.parse(t2)); } catch (e) { return []; } });
                });
            }
            return gm(url).then(txt => { try { return parsePacks(JSON.parse(txt)); } catch (e) { return []; } });
        }

        // 把 package 列表压平成 「[code]→replyEmote / 【中文名】→replyEmote」 两个字典
        function buildDictFromPacks(packs) {
            const dict = {}, chn = {};
            if (Array.isArray(packs)) packs.forEach(p => (p.emote || []).forEach(e => {
                const item = toReplyEmote(e);
                dict[e.text] = item;
                chn[e.text.replace('[', '【').replace(']', '】')] = item;
            }));
            return { dict, chn };
        }

        async function buildEmoteDict(urls) {
            // 内置表情包（椿webp / 基础webp）永远在前，保证本地即用、不依赖任何网络订阅
            const packs = [];
            try { if (BB.BuiltinEmotes && BB.BuiltinEmotes.packs.length) packs.push(...BB.BuiltinEmotes.packs); } catch (e) {}
            for (const u of urls) { const p = await fetchPack(u); if (p && p.length) packs.push(...p); }
            const { dict, chn } = buildDictFromPacks(packs);
            return { packs, dict, chn };
        }

        // 评论注入：
        function injectReplyItem(item) {
            if (!item) return;
            const dict = dictRef.value, chn = chnRef.value;
            if (item.content && typeof item.content.message === 'string') {
                const msg = item.content.message;
                const hasChn = msg.includes('【');
                // 自定义 code 形如 [椿webp_1] / [基础webp_24] 等 —— 用 dict 命中
                const hasCode = msg.includes('[');
                if (hasChn || hasCode) {
                    item.content.emote = item.content.emote || {};
                    if (hasChn) {
                        for (const name in chn) {
                            if (!msg.includes(name)) continue;
                            const r = chn[name];
                            item.content.message = item.content.message.replace(new RegExp(escapeReg(name), 'gm'), ' ' + r.text);
                            item.content.emote[r.text] = r;
                        }
                    }
                    // 补 [code] 映射（仅补缺失的，幂等；不替换 message 文本）
                    if (hasCode) {
                        // 匹配所有形如 [xxx] 的 token，逐个查 dict
                        const codes = item.content.message.match(/\[[^\[\]]+\]/g) || [];
                        for (const c of codes) {
                            const r = dict[c];
                            if (r && !item.content.emote[c]) item.content.emote[c] = r;
                        }
                    }
                }
            }
            if (item.replies) item.replies.forEach(injectReplyItem);
        }

        // 动态：rich_text_nodes 的【中文名】/[code] → EMOJI 节点
        function injectDynamicItem(item) {
            const dict = dictRef.value, chn = chnRef.value;
            const nodes = item && item.modules && item.modules.module_dynamic &&
                item.modules.module_dynamic.desc && item.modules.module_dynamic.desc.rich_text_nodes;
            if (nodes) {
                for (let i = 0; i < nodes.length; i++) {
                    const nd = nodes[i];
                    if (nd && nd.text && nd.text.includes('【')) {
                        const parts = nd.text.split(/(【.+?】)/g).filter(Boolean);
                        nodes.splice(i, 1);
                        for (const p of parts) {
                            if (p in chn) {
                                const r = chn[p];
                                nodes.splice(i, 0, { orig_text: r.text, text: r.text, type: 'RICH_TEXT_NODE_TYPE_EMOJI', emoji: { icon_url: r.url, size: 2, text: r.text, type: 3 } });
                            } else {
                                nodes.splice(i, 0, { orig_text: p, text: p, type: 'RICH_TEXT_NODE_TYPE_TEXT' });
                            }
                            i++;
                        }
                    } else if (nd && nd.text in dict) {
                        const r = dict[nd.text];
                        nd.type = 'RICH_TEXT_NODE_TYPE_EMOJI';
                        nd.emoji = { icon_url: r.url, size: 2, text: nd.text, type: 3 };
                    }
                }
            }
            if (item && item.orig) injectDynamicItem(item.orig);
        }

        function registerInterceptors() {
            BB.Net.register(/api\.bilibili\.com\/x\/emote\/user\/panel\/web/, j => {
                try { if (j.data && Array.isArray(j.data.packages)) j.data.packages = j.data.packages.concat(packsRef); } catch (e) {}
            });
            BB.Net.register(/api\.bilibili\.com\/x\/v2\/reply([/?]|$)/, j => {
                try {
                    if (j.data && j.data.replies !== undefined) {
                        (j.data.replies || []).forEach(injectReplyItem);
                        (j.data.top_replies || []).forEach(injectReplyItem);
                        if (j.data.top && j.data.top.upper) injectReplyItem(j.data.top.upper);
                    }
                    if (j.data && j.data.reply) injectReplyItem(j.data.reply); // reply/add 发表回包
                } catch (e) {}
            });
            BB.Net.register(/api\.bilibili\.com\/x\/polymer\/web-dynamic\/v1\/detail/, j => {
                try { injectDynamicItem(j && j.data && j.data.item); } catch (e) {}
            });
            BB.Net.register(/api\.bilibili\.com\/x\/polymer\/web-dynamic\/v1\/feed\/(space|all)/, j => {
                try { (j.data.items || []).forEach(injectDynamicItem); } catch (e) {}
            });
            BB.Net.register(/app\.bilibili\.com\/x\/topic\/web\/details\/cards/, j => {
                try {
                    const items = j.data && j.data.topic_card_list && j.data.topic_card_list.items || [];
                    items.forEach(it => { if (it.topic_type === 'DYNAMIC') injectDynamicItem(it.dynamic_card_item); });
                } catch (e) {}
            });
        }

        async function start() {
            const built = await buildEmoteDict(cfg.emotes.urls || []);
            dictRef.value = built.dict;
            chnRef.value = built.chn;
            packsRef = built.packs;
            // 始终注册拦截器：内置表情也走这条注入通路（面板追加 / 评论回包补 emote 字典）
            registerInterceptors();
            console.log('[BB] 表情包已加载：', packsRef.length, '个包，', Object.keys(dictRef.value).length, '个表情');
        }

        function init() { if (cfg.enabled.emotes) start(); }
        return { init, getBuilt: () => ({ packs: packsRef, dict: dictRef.value }) };
    })(BB.cfg);

    // ===================================================================
    // BB.Panel —— 设置面板
    // ===================================================================
    BB.Panel = (function (cfg) {
        function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
        let panelEl = null, fabEl = null;

        function mountFab() {
            if (fabEl) return;
            if (!document.body) { document.addEventListener('DOMContentLoaded', mountFab, { once: true }); return; }
            fabEl = document.createElement('div');
            fabEl.id = '__BB_fab__';
            fabEl.title = 'WutheringWaves-BiliSkin 设置';
            fabEl.textContent = '👍';
            fabEl.addEventListener('click', openPanel);
            document.body.appendChild(fabEl);
        }

        function openPanel() {
            if (panelEl) { panelEl.remove(); panelEl = null; return; }
            panelEl = document.createElement('div');
            panelEl.id = '__BB_panel__';
            panelEl.style.cssText = 'position:fixed;top:60px;right:24px;width:420px;max-height:80vh;overflow:auto;z-index:2147483000;'
                + 'background:#1e1e16;color:#e1e1e1;border:1px solid #d2cab8;border-radius:12px;padding:16px 18px;box-shadow:0 10px 40px rgba(0,0,0,.5);font-size:13px';
            panelEl.innerHTML = renderHTML();
            document.body.appendChild(panelEl);
            bindEvents();
        }

        function styleInput(){return 'width:100%;background:#162026;color:#eaf2f0;border:1px solid #4a4a4a;border-radius:6px;padding:6px;box-sizing:border-box';}

        function renderHTML() {
            const p = cfg.purifier, e = cfg.emotes, m = cfg.dm;
            return `
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
  <strong style="color:#dab67d">好好说话</strong>
  <a id="__BB_close__" href="javascript:void(0)" style="color:#9fb3b0">✕</a>
</div>

<fieldset style="border:1px solid #4a4a4a;border-radius:8px;padding:8px;margin:8px 0">
  <legend>总开关</legend>
  <label><input type="checkbox" data-k="enabled.emotes" ${cfg.enabled.emotes?'checked':''}> 表情包</label>
  <label style="margin-left:12px"><input type="checkbox" data-k="enabled.purifier" ${cfg.enabled.purifier?'checked':''}> 评论屏蔽词</label>
  <label style="margin-left:12px"><input type="checkbox" data-k="enabled.dm" ${cfg.enabled.dm?'checked':''}> 私信屏蔽</label>
</fieldset>

<fieldset style="border:1px solid #4a4a4a;border-radius:8px;padding:8px;margin:8px 0">
  <legend>屏蔽词系统</legend>
  <label><input type="checkbox" data-k="purifier.levels.L1" ${p.levels.L1?'checked':''}> L1 核心攻击</label><br>
  <label><input type="checkbox" data-k="purifier.levels.L2" ${p.levels.L2?'checked':''}> L2 引战对立</label><br>
  <label><input type="checkbox" data-k="purifier.levels.L3" ${p.levels.L3?'checked':''}> L3 低质干扰</label><br>
  <label><input type="checkbox" data-k="purifier.enableRegex" ${p.enableRegex?'checked':''}> 启用高级正则</label>
  <div style="margin-top:6px"><strong style="color:#dab67d">屏蔽模式</strong>：
    <label style="margin-left:8px"><input type="radio" name="BBBlockMode" value="fold" ${p.blockMode!=='hide-all'?'checked':''}> 命中即折叠（仅隐藏正文）</label>
    <label style="margin-left:8px"><input type="radio" name="BBBlockMode" value="hide-all" ${p.blockMode==='hide-all'?'checked':''}> 隐藏整条评论（含头像/昵称等全部信息）</label>
  </div>
  <div style="color:#929292;font-size:11px;margin-top:6px">命中即折叠为「已被屏蔽」+「显示/隐藏原文」切换（原文始终保留在 DOM 里）。</div>
  <div style="margin-top:4px"><label><input type="checkbox" data-k="purifier.filterImageOnly" ${p.filterImageOnly?'checked':''}> 过滤纯图片/笔记评论（无文字内容）</label></div>

  <div style="margin-top:8px">自定义屏蔽词（每行一条，用 #L1= / #L2= / #L3= 切层，无前缀默认 L1）:<br>
    <textarea id="__BB_words__" rows="4" style="${styleInput()}">${esc(formatCustomWords(p.customWords))}</textarea></div>

  <div style="margin-top:6px">高级正则规则（每行一条，格式：id pattern）<br>内置可选 id: ${BB.BuiltinBlocklist.regex.map(r=>r.id).join(' / ')}:<br>
    <textarea id="__BB_regex__" rows="3" style="${styleInput()}">${esc((p.customRegex||[]).map(r=>r.id+' '+r.pattern).join('\n'))}</textarea>
    <div style="color:#929292;font-size:11px">写入内置 id 即启用对应正则；任一 pattern 字符串都将作为额外正则启用。需在上方勾选「启用高级正则」。</div></div>

  <div style="margin-top:8px"><strong style="color:#dab67d">黑名单</strong>（命中者其后的评论一律折叠；可在被屏蔽评论旁「加入黑名单」一键添加，也可在此手动管理）:<br>
    <div id="__BB_bl_list__" style="margin-top:4px;max-height:140px;overflow:auto">${renderBlacklist(BB.Purifier.getBlacklist(), 'purifier')}</div>
    <div style="display:flex;gap:6px;margin-top:6px">
      <input id="__BB_bl_uid__" placeholder="UID（可选）" style="${styleInput()}">
      <input id="__BB_bl_name__" placeholder="用户名（可选）" style="${styleInput()}">
      <button id="__BB_bl_add__" style="background:#162026;color:#e1e1e1;border:1px solid #4a4a4a;border-radius:6px;padding:4px 10px">加入</button>
    </div>
  </div>

  <button id="__BB_we_export__" style="margin-top:6px;background:#162026;color:#e1e1e1;border:1px solid #4a4a4a;border-radius:6px;padding:4px 10px">导出词库</button>
  <button id="__BB_we_import__" style="margin-left:6px;background:#162026;color:#e1e1e1;border:1px solid #4a4a4a;border-radius:6px;padding:4px 10px">导入词库</button>
</fieldset>

<fieldset style="border:1px solid #4a4a4a;border-radius:8px;padding:8px;margin:8px 0">
  <legend>私信屏蔽（message.bilibili.com）</legend>
  <div style="color:#929292;font-size:11px;margin-bottom:4px">在私信接口响应到手前改写：黑名单发送者命中→屏蔽其全部消息；关键词/正则命中→把对应消息或会话预览折叠为占位。需在「总开关」勾选「私信屏蔽」生效。</div>
  <label><input type="checkbox" data-k="dm.keywordBlock" ${m.keywordBlock?'checked':''}> 关键词屏蔽</label>
  <label style="display:block;margin-top:6px"><input type="checkbox" data-k="dm.hideHitSession" ${m.hideHitSession?'checked':''}> 会话列表命中即从列表隐藏该会话（否则仅折叠预览）</label>
  <div style="margin-top:6px">私信关键词（每行一条）:<br>
    <textarea id="__BB_dm_keywords__" rows="3" style="${styleInput()}" placeholder="每行一个，命中即折叠该私信">${esc((m.keywords||[]).join('\n'))}</textarea></div>
  <div style="margin-top:6px">正则规则（每行一条，格式：id /pattern/flag ）:<br>
    <textarea id="__BB_dm_regex__" rows="2" style="${styleInput()}">${esc((m.blockRegex||[]).map(r => (r.id||'') + ' /' + (r.pattern||'') + '/' + (r.flag||'')).join('\n'))}</textarea>
    <div style="color:#929292;font-size:11px">例：phone /加微信|VX[:：]?\\s*\\d+/</div></div>
  <div style="margin-top:8px"><strong style="color:#dab67d">黑名单</strong>（按发送者屏蔽，UID 或用户名）:<br>
    <div id="__BB_dm_bl_list__" style="margin-top:4px;max-height:120px;overflow:auto">${renderBlacklist(m.blacklist||[], 'dm')}</div>
    <div style="display:flex;gap:6px;margin-top:6px">
      <input id="__BB_dm_bl_uid__" placeholder="UID（可选）" style="${styleInput()}">
      <input id="__BB_dm_bl_name__" placeholder="用户名（可选）" style="${styleInput()}">
      <button id="__BB_dm_bl_add__" style="background:#162026;color:#e1e1e1;border:1px solid #4a4a4a;border-radius:6px;padding:4px 10px">加入</button>
    </div>
  </div>
</fieldset>

<fieldset style="border:1px solid #4a4a4a;border-radius:8px;padding:8px;margin:8px 0">
  <legend>表情包</legend>
  <div style="color:#dab67d;font-size:12px;margin-bottom:4px">内置韩版表情包：大傻椿 + 基础</div>
  <div>额外订阅 JSON（每行一个 URL，可选）:<br>
    <textarea id="__BB_emotes__" rows="3" style="${styleInput()}" placeholder="表情包订阅 JSON 的 URL（B站 emote panel 格式）">${esc((e.urls||[]).join('\n'))}</textarea></div>
  <div style="color:#929292;font-size:11px;margin-top:4px">
    额外订阅生效后，对应表情会作为原生分组追加到评论表情面板（点选即插入）；评论/动态里的【中文名】或 [code] 也会渲染成图。
  </div>
</fieldset>

<div style="text-align:right;margin-top:8px">
  <button id="__BB_save__" style="background:linear-gradient(135deg,#dab67d,#c9ac67);color:#1e1e16;font-weight:700;border:none;border-radius:8px;padding:6px 18px;cursor:pointer">保存并刷新</button>
</div>
<div style="color:#929292;font-size:11px;margin-top:6px;text-align:center">v${BB.Config.VERSION}</div>
`;
        }

        function formatCustomWords(cw) {
            const out = [];
            (cw.L1||[]).forEach(w=>out.push('#L1='+w));
            (cw.L2||[]).forEach(w=>out.push('#L2='+w));
            (cw.L3||[]).forEach(w=>out.push('#L3='+w));
            return out.join('\n');
        }
        // 渲染黑名单列表（每项一行：name(uid) [移除]）。scope='purifier'|'dm' 区分两处。
        function renderBlacklist(list, scope) {
            if (!list || !list.length) return '<div style="color:#929292;font-size:11px">（暂无）</div>';
            return list.map((b, i) => {
                const label = (b.name ? esc(b.name) + ' ' : '') + (b.uid ? '(' + esc(b.uid) + ')' : '');
                return `<div style="display:flex;align-items:center;gap:6px;padding:2px 0;font-size:12px">
  <span style="flex:1;color:#e1e1e1">${label || '（无信息）'}</span>
  <a href="javascript:void(0)" data-BB-bl-rm="${scope}:${i}" style="color:#fb7299;text-decoration:none">移除</a>
</div>`;
            }).join('');
        }
        function parseCustomWords(text) {
            const out = { L1:[], L2:[], L3:[] };
            text.split('\n').forEach(l => {
                l = l.trim(); if (!l) return;
                const m = l.match(/^#(L[123])=(.*)$/);
                if (m) out[m[1]].push(m[2]); else out.L1.push(l);
            });
            return out;
        }
        function setByPath(obj, path, val) {
            const ks = path.split('.'); let o = obj;
            for (let i=0;i<ks.length-1;i++) o = o[ks[i]];
            o[ks[ks.length-1]] = val;
        }

        function bindEvents() {
            panelEl.querySelector('#__BB_close__').addEventListener('click', () => { panelEl.remove(); panelEl = null; });
            panelEl.querySelectorAll('input[data-k]').forEach(el => {
                el.addEventListener('change', () => setByPath(cfg, el.getAttribute('data-k'), el.checked));
            });
            // blockMode radio：立即写入 cfg（即时生效；保存时持久化）
            panelEl.querySelectorAll('input[name="BBBlockMode"]').forEach(el => {
                el.addEventListener('change', () => { if (el.checked) cfg.purifier.blockMode = el.value; });
            });

            // —— 黑名单（屏蔽词系统）即时加/减，无需保存即生效并持久化 ——
            function syncBlUI() { panelEl.querySelector('#__BB_bl_list__').innerHTML = renderBlacklist(BB.Purifier.getBlacklist(), 'purifier'); }
            function syncDmBlUI() { panelEl.querySelector('#__BB_dm_bl_list__').innerHTML = renderBlacklist(cfg.dm.blacklist||[], 'dm'); }
            panelEl.querySelector('#__BB_bl_add__').addEventListener('click', () => {
                const uid = panelEl.querySelector('#__BB_bl_uid__').value.trim();
                const name = panelEl.querySelector('#__BB_bl_name__').value.trim();
                if (!uid && !name) return;
                BB.Purifier.addBlacklist(uid, name);
                panelEl.querySelector('#__BB_bl_uid__').value = ''; panelEl.querySelector('#__BB_bl_name__').value = '';
                syncBlUI(); BB.Purifier.invalidate(); BB.Purifier.scan();
            });
            panelEl.querySelector('#__BB_dm_bl_add__').addEventListener('click', () => {
                const uid = panelEl.querySelector('#__BB_dm_bl_uid__').value.trim();
                const name = panelEl.querySelector('#__BB_dm_bl_name__').value.trim();
                if (!uid && !name) return;
                cfg.dm.blacklist = cfg.dm.blacklist || [];
                cfg.dm.blacklist.push({ uid, name });
                BB.Config.save(cfg);
                try { BB.DM.invalidate(); } catch (e) {}
                panelEl.querySelector('#__BB_dm_bl_uid__').value = ''; panelEl.querySelector('#__BB_dm_bl_name__').value = '';
                syncDmBlUI();
            });
            // 移除按钮（事件委托）
            panelEl.addEventListener('click', e => {
                const t = e.target;
                if (!t || !t.dataset || !t.dataset.BBBlRm) return;
                e.preventDefault();
                const [scope, idxStr] = t.dataset.BBBlRm.split(':');
                const idx = parseInt(idxStr, 10);
                if (scope === 'purifier') {
                    const b = BB.Purifier.getBlacklist()[idx];
                    if (b) BB.Purifier.removeBlacklist(b.uid || '', b.name || '');
                    BB.Purifier.invalidate(); syncBlUI();
                } else if (scope === 'dm') {
                    const arr = cfg.dm.blacklist || []; const b = arr[idx];
                    if (b) { cfg.dm.blacklist = arr.filter((_, i) => i !== idx); BB.Config.save(cfg); try { BB.DM.invalidate(); } catch (e) {} }
                    syncDmBlUI();
                }
            });

            panelEl.querySelector('#__BB_save__').addEventListener('click', () => {
                cfg.purifier.customWords = parseCustomWords(panelEl.querySelector('#__BB_words__').value);
                cfg.purifier.customRegex = panelEl.querySelector('#__BB_regex__').value.split('\n').map(l=>{
                    l=l.trim(); if(!l) return null;
                    const mm = l.match(/^(\S+)\s+(.+)$/);
                    if (mm) return { id:mm[1], pattern:mm[2], enabled:true };
                    return { id:'custom_'+Math.random().toString(36).slice(2,6), pattern:l, enabled:true };
                }).filter(Boolean);
                cfg.emotes.urls = panelEl.querySelector('#__BB_emotes__').value.split('\n').map(s=>s.trim()).filter(Boolean);
                // 私信屏蔽
                cfg.dm.keywords = panelEl.querySelector('#__BB_dm_keywords__').value.split('\n').map(s=>s.trim()).filter(Boolean);
                cfg.dm.blockRegex = panelEl.querySelector('#__BB_dm_regex__').value.split('\n').map(l => {
                    l = l.trim(); if (!l) return null;
                    const mm = l.match(/^(\S+)\s+\/(.*?)\/([gimsuy]*)$/);
                    if (mm) return { id: mm[1], pattern: mm[2], flag: mm[3], enabled: true };
                    return { id: 'dm_'+Math.random().toString(36).slice(2,6), pattern: l, enabled: true };
                }).filter(Boolean);
                // blockMode 持久化（radio 写入的值在 cfg 里，直接保存）
                BB.Config.save(cfg);
                BB.Purifier.invalidate();
                try { BB.DM.invalidate(); } catch (e) {}
                alert('已保存，刷新页面生效');
                location.reload();
            });
            panelEl.querySelector('#__BB_we_export__').addEventListener('click', () => {
                download('BB-blocklist.json', JSON.stringify(BB.Purifier.exportBlocklist(), null, 2));
            });
            panelEl.querySelector('#__BB_we_import__').addEventListener('click', () => fileInput('.json', txt => {
                const j = JSON.parse(txt);
                cfg.purifier.customWords = { L1:j.L1||[], L2:j.L2||[], L3:j.L3||[] };
                if (j.customRegex) cfg.purifier.customRegex = j.customRegex;
                if (Array.isArray(j.blacklist)) cfg.purifier.blacklist = j.blacklist;
                BB.Config.save(cfg);
                alert('词库已导入，刷新生效');
                location.reload();
            }));
        }

        function download(name, text) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
            a.download = name; a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        }
        function fileInput(accept, cb) {
            const i = document.createElement('input');
            i.type = 'file'; i.accept = accept;
            i.addEventListener('change', () => { const f = i.files[0]; if (f){ const r = new FileReader(); r.onload = () => cb(r.result); r.readAsText(f); } });
            i.click();
        }

        function init() {
            const boot = () => mountFab();
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
            else boot();
        }
        return { init };
    })(BB.cfg);

    // ===================================================================
    // BB.Core —— 入口
    // ===================================================================
    BB.Core = (function () {
        function boot() {
            try { BB.Emotes.init(); } catch (e) { console.error('[BB] Emotes', e); }
            try { BB.Purifier.init(); } catch (e) { console.error('[BB] Purifier', e); }
            try { BB.DM.init(); } catch (e) { console.error('[BB] DM', e); }
            try { BB.Panel.init(); } catch (e) { console.error('[BB] Panel', e); }
        }
        return { boot };
    })();

    BB.Core.boot();
    console.log('[BB] WutheringWaves-BiliSkin(精简版) 已加载', BB.cfg.version);

})(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window);
