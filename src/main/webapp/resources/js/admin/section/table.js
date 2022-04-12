// 테이블 컴포넌트 -> table 태그를 반환
class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allchked: false,
            chkList: [],
        }

        this.allCheck = this.allCheck.bind(this);
        this.eachCheck = this.eachCheck.bind(this);
    }

    // 전체 체크 박스의 상태를 변경하는 함수
    allCheck() {
        const { allchked, chkList } = this.state;
        const changeChk = chkList.map((chk, idx) => {
            chk = !allchked;
            return chk;
        });

        this.setState({
            allchked: !allchked,
            chkList: changeChk

        })
    }

    // 개별 체크 박스의 상태를 변경하는 함수
    eachCheck(boxIdx) {
        const { chkList } = this.state;
        const changeChk = chkList.map((chk, idx) => {
            if (idx === boxIdx) chk = !chk;
            return chk;
        });
        this.setState({ chkList: changeChk });
    };

    //해당 컴포넌트가 list props를 받으면 list.length만큼 체크 박스들의 상태(false) 생성
    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list) {
            const { list, onInitCodes } = this.props;

            this.setState({
                allchked: false,
                chkList: new Array(list.length).fill(false)
            });

            onInitCodes();
        }
    }

    render() {
        const { list, category, id, onDelete, onItem, onGetCode, onGetCodes } = this.props;
        const { allchked, chkList } = this.state;

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {category === 'sub' || category === 'orders' ? null
                                : <td>
                                    <input type="checkbox"
                                        checked={allchked}
                                        onChange={this.allCheck}
                                        onClick={onGetCodes}
                                    />
                                </td>
                            }
                            {category === 'product' ? <ProductTh /> : ''}
                            {category === 'sub' || category === 'orders' ? <OrdersTh /> : ''}
                            {category === 'member' ? <MemberTh /> : ''}
                            {category === 'review' ? <ReviewTh /> : ''}
                            {category === 'tag' ? <TagTh /> : ''}
                        </tr>
                    </thead>
                    <Tbody
                        list={list}
                        id={id}
                        category={category}
                        onDelete={onDelete}
                        onItem={onItem}
                        chkList={chkList}
                        onEachCheck={this.eachCheck}
                        onGetCode={onGetCode}
                    />
                </table>
            </div>
        );
    }
}