'use strict';

angular.module('webApp')
	.factory('Discover', function ($q, $http) {
		// Service logic
		// ...

		var meaningOfLife = 42;
		var question_1 = {
			title: '洗臉後不擦任何保養品 20分鐘後感覺',
			question_id: 1,
			options: [
				{
					name: '緊繃—屬乾性肌',
					tag: '乾性肌',
					option_id: 11
				},
				{
					name: '出油—屬油性肌',
					tag: '油性肌',
					option_id: 12
				},
				{
					name: '舒適—屬一般肌',
					tag: '一般肌',
					option_id: 13
				},
				{
					name: '兩頰較緊繃， T字部位出油—屬混合肌',
					tag: '混合肌',
					option_id: 14
				}
			]
		};
		var question_2 = {
			title: '是否為敏感肌',
			question_id: 2,
			options: [
				{
					name: '是-容易乾癢、泛紅，季節交替易敏感',
					tag: '敏感肌',
					option_id: 21
				},
				{
					name: '否',
					tag: '非敏感肌',
					option_id: 22
				}
			]
		};
		var question_3 = {
			title: '主要想改善的方向',
			question_id: 3,
			options: [
				{
					name: '乾燥缺水，常出現細紋',
					tag: '',
					option_id: 31
				},
				{
					name: '膚色不均，有暗沈斑點',
					tag: '',
					option_id: 32
				},
				{
					name: '缺乏彈性，不夠緊實',
					tag: '',
					option_id: 33
				},
				{
					name: 'Ｔ字部位泛油光，兩頰乾燥',
					tag: '',
					option_id: 34
				},
				{
					name: '新陳代謝不佳，膚色蠟黃',
					tag: '',
					option_id: 35
				}
			]
		};
		var question_4 = {
			title: '妝容常見問題',
			question_id: 4,
			options: [
				{
					name: '妝容常有乾紋，不服貼',
					tag: '',
					option_id: 41
				},
				{
					name: '妝容常因出油而浮粉脫妝',
					tag: '',
					option_id: 42
				}
			]
		};
		var question_5 = {
			title: '是否有痘痘困擾',
			question_id: 5,
			options: [
				{
					name: '幾乎不長',
					tag: '',
					option_id: 51
				},
				{
					name: '時常有痘痘',
					tag: '',
					option_id: 52
				},
				{
					name: '生理期前後會長痘痘',
					tag: '',
					option_id: 53
				}
			]
		};
		var question_6 = {
			title: '是否有粉刺困擾',
			question_id: 6,
			options: [
				{
					name: '有',
					tag: '',
					option_id: 61
				},
				{
					name: '沒有',
					tag: '',
					option_id: 62
				}
			]
		};		
		var question_7 = {
			title: '是否懷孕或正在哺乳中',
			question_id: 7,
			options: [
				{
					name: '是',
					tag: '',
					option_id: 71
				},
				{
					name: '否',
					tag: '',
					option_id: 72
				}
			]
		};


		var questions = [
			question_1,
			question_2,
			question_3,
			question_4,
			question_5,
			question_6,
			question_7
		];

		var products = [
			{
				step: 'a',
				name: '牛奶胺基酸潔顏慕絲',
				product_id: 250,
				model: 'milkMousse150',
				desc: '溫和洗淨'
			},
			{
				step: 'b',
				name: '植萃導入保濕化妝水',
				product_id: 52,
				model: 'pToner120',
				desc: '平衡導入'
			},
			{
				step: 'c',
				name: '舒敏角鯊潤澤精萃',
				product_id: 91,
				model: 'oilSerum30',
				desc: '有效潤澤'
			},
			{
				step: 'd',
				name: '全效能青春水凝乳',
				product_id: 0,
				model: '',
				desc: '保濕補水'
			},
			{
				step: 'e',
				name: '水感輕透防曬凝乳 SPF50 ✭✭✭',
				product_id: 276,
				model: 'sunPLotion50',
				desc: '高效防曬'
			},
			{
				step: 'f',
				name: '薰衣草植萃舒緩卸妝油',
				product_id: 253,
				model: 'leCleanOil200',
				desc: '徹底卸妝'
			},
			{
				step: 'g',
				name: '全效能青春活化霜',
				product_id: 96,
				model: 'rCream30',
				desc: '長效鎖水'
			},
			{
				step: 'h',
				name: 'Vitamin C 植萃亮白奇蹟水',
				product_id: 256,
				model: 'vitCToner150',
				desc: '淨白導入'
			},
			{
				step: 'i',
				name: 'Vitamin C 植萃亮白奇蹟精華',
				product_id: 257,
				model: 'vitCSerum50',
				desc: '提亮膚色'
			},
			{
				step: 'j',
				name: 'Vitamin C 植萃亮白奇蹟重點淡斑精華',
				product_id: 259,
				model: 'vitCSpot30',
				desc: '瓦解斑點'
			},
			{
				step: 'k',
				name: 'Vitamin C 植萃亮白奇蹟精華霜',
				product_id: 258,
				model: 'vitCCream30',
				desc: '全面亮白'
			},
			{
				step: 'l',
				name: '全效能青春活化露',
				product_id: 111,
				model: 'rSerum50',
				desc: '有效撫紋'
			},
			{
				step: 'm',
				name: '芙蓉花精淨白潔顏霜',
				product_id: 140,
				model: 'hClean75',
				desc: '有效清潔'
			},
			{
				step: 'n',
				name: '芙蓉花精淨白化妝水',
				product_id: 121,
				model: 'hToner100',
				desc: '導入保濕'
			},
			{
				step: 'o',
				name: '芙蓉花精淨白精華',
				product_id: 120,
				model: 'vitCSerum50',
				desc: '溫和煥膚'
			},
			{
				step: 'p',
				name: '芙蓉花精淨白乳',
				product_id: 122,
				model: 'hLotion50',
				desc: ''
			},
			{
				step: 'q',
				name: '舒敏淨白保濕卸妝水',
				product_id: 50,
				model: 'cWater200',
				desc: '清爽卸妝'
			},
			{
				step: 'r',
				name: '雛菊花亮白晚安凍膜',
				product_id: 137,
				model: 'daisyNgel75',
				desc: '保濕補水'
			},
			{
				step: 's',
				name: '水感活泉精華液',
				product_id: 53,
				model: 'wSerum30',
				desc: ''
			},
			{
				step: 't',
				name: '10%杏仁酸煥白精華',
				product_id: 125,
				model: 'acid30',
				desc: '加速代謝'
			},
			{
				step: 'u',
				name: '七葉樹舒緩精華',
				product_id: 271,
				model: 'acne30',
				desc: '有痘痘時，白天/晚上洗臉後使用『七葉樹舒緩精華』'
			},
			{
				step: 'v',
				name: '繡線菊更新精華',
				product_id: 255,
				model: 'peel15',
				desc: ''
			},
			{
				step: 'w',
				name: '蘑菇毛孔淨化泥膜',
				product_id: 273,
				model: 'mushMask75',
				desc: ''
			},
			{
				step: 'x',
				name: '金縷梅抗痘收斂竹炭膜',
				product_id: 272,
				model: 'charMask75',
				desc: ''
			}

		];
		var solutions = [
			{
				anwser: '11-31',
				products: ['f','a','b','c','d','e', 'g'],
				desc: '補水也要補油，此系列使用親膚性油脂『角鯊』，能夠真正被肌膚吸收，修復滋潤乾燥的肌膚。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲（溫和洗淨）、植萃導入保溼化妝水（平衡導入）、舒敏角鯊潤澤精萃（有效潤澤）、全效能青春水凝乳（保濕補水）、水感輕透防曬凝乳/CC霜（高效防曬）',
				night_desc: '晚：薰衣草舒緩卸妝油（徹底卸妝）、牛奶胺基酸潔顏慕絲（溫和洗淨）、植萃導入保溼化妝水（平衡導入）、舒敏角鯊潤澤精萃（有效潤澤）、全效能青春活化霜（長效鎖水）'
			},{
				anwser: '11-32',
				products: ['f','a','h','i','j','e','k'],
				desc: '修飾過後的經典美白『維生素C』，較一般美白成分更佳『穩定』、『有效』、『溫和』，使用四週就有感。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲（溫和洗淨）、9515植萃亮白奇蹟水（淨白導入）、植萃亮白奇蹟精華（提亮膚色）、水感輕透防曬凝乳/CC霜',
				night: '晚：薰衣草舒緩卸妝油（徹底卸妝）、牛奶胺基酸潔顏慕絲（溫和洗淨）、維生素C植萃亮白奇蹟水（淨白導入）、植萃亮白奇蹟精華（提亮膚色）、植萃亮白重點淡斑精華（瓦解斑點）、植萃亮白奇蹟霜（全面亮白）'
			},{
				anwser: '11-33',
				products: ['f','a','b','l','d','e', 'g'],
				desc: '要改善缺乏彈性的第一步還是保濕！在保濕精華內加入兩耳草萃取有效對抗彈性纖維瓦解並改善肌膚彈性，搭配五、六胜肽，讓細紋漸漸被撫平，讓肌膚維持年輕狀態。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲（溫和洗淨）、植萃導入保溼化妝水（平衡導入）、全效能青春活化露（有效撫紋）、全效能青春水凝乳（保濕彈潤）水感輕透防曬凝乳/CC霜 （高效防曬）',
				night_desc: '晚：薰衣草舒緩卸妝油（徹底卸妝）、牛奶胺基酸潔顏慕絲（溫和洗淨）、植萃導入保溼化妝水（平衡導入）、全效能青春活化露（有效撫紋）、全效能青春活化霜（鎖水緊緻）'
			},{
				anwser: '11-34',
				products: [],
				desc: '無此選項',
				morning_desc: '',
				night_desc: ''
			},{
				anwser: '11-35',
				products: ['f','m','n','o','e','p'],
				desc: '德國芙蓉花酸，加快細胞代謝週期，有溫和煥膚與提亮膚色的功效，全面改善膚質，讓肌膚柔嫩光透。',
				morning_desc: '早：芙蓉花精淨白潔顏霜（有效清潔）、芙蓉花精淨白化妝水（導入保濕）、芙蓉花精淨白精華（溫和煥膚）、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油（徹底卸妝）、芙蓉花精淨白潔顏霜（有效清潔）、芙蓉花精淨白化妝水（導入保濕）、芙蓉花精淨白精華（溫和煥膚）、芙蓉花精淨白乳',
				notice: '注意事項：此系列不建議與其他酸類同時使用（EX: 杏仁酸）'
			},{
				anwser: '12-31',
				products: [],
				desc: '無此選項',
				night_desc: '',
				morning_desc: ''
			},{
				anwser: '12-32',
				products: ['q','m','h','i','j','r','e'],
				desc: '修飾過後的經典美白『維生素C』，較一般美白成分更佳『穩定』、『有效』、『溫和』，使用四週就有感。',
				morning_desc: '早：芙蓉花精淨白潔顏霜（有效洗淨）、9515植萃亮白奇蹟水（淨白導入）、植萃亮白奇蹟精華（提亮膚色）、水感輕透防曬凝乳/CC霜 （高效防曬）',
				night_desc: '晚：舒敏淨白保濕卸妝水（清爽卸妝）、芙蓉花精淨白潔顏霜（有效洗淨）、維生素C植萃亮白奇蹟水（淨白導入）、植萃亮白奇蹟精華（提亮膚色）、植萃亮白重點淡斑精華（瓦解斑點）、雛菊亮白晚安凍膜（保濕補水）'
			},{
				anwser: '12-33',
				products: ['q','m','b','l','e','d'],
				desc: '兩耳草萃取有效對抗彈性纖維瓦解改善肌膚彈性，搭配五、六胜肽，讓細紋漸漸被撫平，讓肌膚維持年輕狀態。',
				morning_desc: '早：芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、全效能青春活化露、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：舒敏淨白保濕卸妝水、芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、全效能青春活化露、全效能青春水凝乳'
			},{
				anwser: '12-34',
				products: ['q','m','b','s','d','r','e'],
				desc: '你需要清透型的保濕，保濕做好自然出油會減少，且白天不需要使用乳液，因為防曬及底妝的保濕對於油性肌膚來說已經足夠了，晚上加強使用清爽型乳液修復肌膚或凍膜幫助控油，減少日間出油及兩頰較為乾燥的情形。',
				morning_desc: '早：芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：舒敏淨白保濕卸妝水、芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、全效能青春水凝乳/雛菊花亮白晚安凍膜'
			},{
				anwser: '12-35',
				products: ['q','m','t','b','s','e','d'],
				desc: '利用10%杏仁酸，加快細胞代謝週期，讓色素及粉刺代謝，改善蠟黃的情況；杏仁酸也幫助後續保養更好吸收並利用水感保濕精華減少出油的狀況！但記得使用杏仁酸要加強保濕，因此要加上水凝乳來鎖住肌膚的水分。',
				morning_desc: '早：芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：舒敏淨白保濕卸妝水、芙蓉花精淨白潔顏霜、10%杏仁酸煥白精華（加速代謝）、植萃導入保溼化妝水、水感活泉精華液、全效能青春水凝乳'
			},{
				anwser: '13-31',
				products: ['f','q','a','h','i','j','m', 'b','k','s','e'],
				desc: '維持膚況的穩定，使用基礎保濕系列即可改善缺水。利用親膚性油脂『角鯊』，能夠真正被肌膚吸收，修復滋潤乾燥的肌膚。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、水感活泉精華液/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '13-32',
				products: ['f', 'q', 'a','m','h','i','j', 'e', 'k'],
				desc: '修飾過後的經典美白『維生素C』，較一般美白成分更佳『穩定』、『有效』、『溫和』，使用四週就有感。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、9515植萃亮白奇蹟水、植萃亮白奇蹟精華、水感輕透防曬凝乳/CC霜 ',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、牛奶胺基酸潔顏慕絲、維生素C植萃亮白奇蹟水、植萃亮白奇蹟精華、植萃亮白重點淡斑精華、植萃亮白奇蹟霜'
			},{
				anwser: '13-33',
				products: ['f','q','a','m','n','b','l','c','e','d'],
				desc: '要改善缺乏彈性的第一步還是保濕！在保濕精華內加入兩耳草萃取有效對抗彈性纖維瓦解改善肌膚彈性，搭配五、六胜肽，讓細紋漸漸被撫平，讓肌膚維持年輕狀態。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、全效能青春活化露、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、全效能青春活化露/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '13-34',
				products: ['f','q','a','m','l','c','b','s','e','d'],
				desc: '重點為進行『分區保養』兩頰部分由於較乾燥，使用『舒敏角鯊潤澤精萃』。T字部位則使用較清爽的『水感活泉精華液』，清爽保濕並減少油脂分泌。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、水感活泉精華液/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '13-35',
				products: ['f','m','n','o','e','r','d'],
				desc: '利用德國芙蓉花酸，加快細胞代謝週期，有溫和煥膚與提亮膚色的功效，全面改善膚質，讓肌膚柔嫩光透。',
				morning_desc: '早：芙蓉花精淨白潔顏霜、芙蓉花精淨白化妝水、芙蓉花精淨白精華、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油、芙蓉花精淨白潔顏霜、芙蓉花精淨白化妝水、芙蓉花精淨白精華（視情況加入雛菊花亮白晚安凍膜/全效能青春水凝乳）'
			},{
				anwser: '14-31',
				products: ['f','q','a','m','b','s','c','e','d'],
				desc: '重點為進行『分區保養』兩頰部分由於較乾燥，使用『舒敏角鯊潤澤精萃』。T字部位則使用較清爽的『水感活泉精華液』，讓肌膚保水，但又不會過度油膩。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、水感活泉精華液/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '14-32',
				products: ['f','q','a','b','m','h','i','j','e','k'],
				desc: '修飾過後的經典美白『維生素C』，較一般美白成分更佳『穩定』、『有效』、『溫和』，使用四週就有感。混合肌要注意，較為滋潤的霜類可以擦在兩頰加強保濕，進行分區保養。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、9515植萃亮白奇蹟水、植萃亮白奇蹟精華、水感輕透防曬凝乳/CC霜 ',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、牛奶胺基酸潔顏慕絲、維生素C植萃亮白奇蹟水、植萃亮白奇蹟精華、植萃亮白重點淡斑精華、植萃亮白奇蹟霜'
			},{
				anwser: '14-33',
				products: ['f','q','a','m','b','l','c','e','d'],
				desc: '要改善缺乏彈性的第一步還是保濕！在保濕精華內加入兩耳草萃取有效對抗彈性纖維瓦解改善肌膚彈性，搭配五、六胜肽，讓細紋漸漸被撫平，讓肌膚維持年輕狀態。混合肌要注意，在兩頰補充『舒敏角鯊潤澤精萃』加強保濕，進行分區保養。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、全效能青春活化露、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、全效能青春活化露/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '14-34',
				products: ['f','q','a','m','b','s','c','e','d'],
				desc: '重點為進行『分區保養』兩頰部分由於較乾燥，使用『舒敏角鯊潤澤精萃』潤澤。T字部位則使用較清爽的『水感活泉精華液』，清爽保濕並減少油脂分泌。',
				morning_desc: '早：牛奶胺基酸潔顏慕絲/芙蓉花精淨白潔顏霜、植萃導入保溼化妝水、水感活泉精華液、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油/舒敏淨白保濕卸妝水、植萃導入保溼化妝水、水感活泉精華液/舒敏角鯊潤澤精萃、全效能青春水凝乳'
			},{
				anwser: '14-35',
				products: ['f','m','n','o','r','d','e'],
				desc: '利用德國芙蓉花酸，加快細胞代謝週期，有溫和煥膚與提亮膚色的功效，全面改善膚質，讓肌膚柔嫩光透。',
				morning_desc: '早：芙蓉花精淨白潔顏霜、芙蓉花精淨白化妝水、芙蓉花精淨白精華、水感輕透防曬凝乳/CC霜',
				night_desc: '晚：薰衣草舒緩卸妝油、芙蓉花精淨白潔顏霜、芙蓉花精淨白化妝水、芙蓉花精淨白精華（視情況加入雛菊花亮白晚安凍膜/全效能青春水凝乳）'
			}
		]
		var getFromCustomer = function() {
			var defer = $q.defer();
			$http.get('/api/rewards/')
			.then(function(result) {
				if(result.data.points && result.data.points < 0) {
					result.data.points = 0;
				}
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;
		};
		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			},
			products: products,
			getFromCustomer: getFromCustomer,
			questions: questions,
			solutions: solutions
		};
	});
