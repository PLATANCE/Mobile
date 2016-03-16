export default (state) => ({
    addressCoverages: [
    {
        gu: '강남구',
        dong: [{ name: '신사동' }, { name: '압구정동' }, { name: '청담동' }, { name: '논현동' },
            { name: '삼성동' }, { name: '역삼동' }, { name: '대치동' }, { name: '도곡동' }]
    }, {
        gu: '서초구',
        dong: [{ name: '잠원동' }, { name: '반포동' }, { name: '서초동' }]
    }, {
        gu: '용산구',
        dong: [{ name: '한남동' }, { name: '이태원동' }]
    }, {
        gu: '성동구',
        dong: [{ name: '금호동' }, { name: '성수동' }, { name: '옥수동' }]
    }]
});
