'use strict';
export default (state) => ({
    menu: {
        name: "수비드 연어 스테이크",
        foreignName: "Sous Vide Salmon Steak",
        averageReviewScore: 4.5,
        reviewCount: 93,
        originalPrice: 11000,
        sellingPrice: 8000,
        chef: {
            name: "Andrew Kim Chef",
            affiliation: "前 Purearena Executive Chef"
        },
        description: "신선하고 촉촉한 노르웨이산 연어의 부드러운 참 맛을 느낄 수 있도록 연어휠렛을 수비드로 조리하여 시어링으로 마무리했습니다. 한끼 식사로 충분하도록 라임으로 깔끔함을 더한 완두콩 매쉬에 로스트 포테이토, 그리고 라따뚜이를 곁들였습니다.",
        ingredients: "연어, 딜, 케이퍼, 사워크림, 완두콩, 빈스트링, 감자, 라임, 주끼니, 당근, 가지, 토마토 (야채 가니쉬는 당일 가장 신선한 제철 재료로 변경될 수 있습니다)",
        calories: 530,
        reviews: [{
            score: 5,
            dateString: "2016-01-23",
            content: "연어와 사워크림 그리고 빈스트링 그린빈의 조화가 너무 잘 맞아서 맛있게 먹었어요! 하지만 아쉬운 점은 남자가 한끼 식사로 하기엔 약간?! 아쉬움이 남는 양이었어요 ㅠ 감자의 양이 좀 더 많았다면 배도 부를수 있었을거 같아요. 잘먹었습니다!!",
            maskedPhoneNumber: "010-94**-****"
        }, {
            score: 4,
            dateString: "2016-01-12",
            content: "아주 맛있고 일단 시각적으로 보는 눈도 즐거운 요리였던것 같아요~ 그릇에 칸막이가 없어서 갈비스튜의 기름이 버섯라구에게 침범해서 느끼함이 좀 있었지만 ^^ 갈비스튜는 간이 잘 베어있고 그리고 렌지로 데웠는데도 전혀 질기지 않았어요. 단호박뇨끼는 상큼한 샐러드랑 구성되어 있어도 여자분들 한끼식사로는 충분할것 같은 든든한 맛이였구요 ^^ (아주 맛있네요) 제가 싱겁게 먹어서 그런지 개인적으로는 간이 센것 같았어요~ ^^",
            maskedPhoneNumber: "010-95**-****"
        }, {
            score: 3.5,
            dateString: "2016-02-23",
            content: "너무 맛있게 잘 먹었습니다! 배달상태가 좋아서 비주얼도 만족스러웠습니다. 스프나 빵이 추가되면 특별한 날이 아니더라도 혼자 식사 대용으로 가능할거 같아요 ㅎㅎ",
            maskedPhoneNumber: "010-12**-****"
        }]
    },
    cartCount: 3,
    isShowAllReview: false
});
