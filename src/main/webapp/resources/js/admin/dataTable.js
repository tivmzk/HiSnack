// 테이블 컴포넌트 -> table 태그를 반환
class DataTable extends React.Component {
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
            if(idx === boxIdx) chk = !chk;
            return chk;
        });
        this.setState({chkList: changeChk});
    };

    //해당 컴포넌트가 list props를 받으면 list.length만큼 체크 박스들의 상태(false) 생성
    componentDidUpdate(prevProps) {
        if(this.props.list !== prevProps.list) {
            const { list, onInitCodes } = this.props;

            this.setState({ 
                allchked : false,
                chkList: new Array(list.length).fill(false)
            });

            onInitCodes();
        }
    }

    render() {
        const { list, onDelete, onItem, onGetCode, onGetCodes } = this.props;
        const { allchked, chkList } = this.state;
        
        return (
            <div>
                {/* css 작업 시작 시 border 속성 삭제해도 됨 */}
                <table border="1">
                    <thead id="th">
                        <tr>
                            <td>
                                <input type="checkbox"
                                        checked={allchked}
                                        onChange={this.allCheck}
                                        onClick={onGetCodes}
                                />
                            </td>
                            <td>제품 번호</td>
                            <td>사진</td>
                            <td>제품명</td>
                            <td>가격</td>
                            <td>제조사</td>
                            <td>관리</td>
                        </tr>
                    </thead>
                    <List 
                        list={list} 
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

//테이블의 행 컴포넌트 -> DB의 각 table에 저장된 데이터의 list를 반환
class List extends React.Component {
    
    render() {
        const { list, chkList, onEachCheck, onGetCode, onDelete, onItem } = this.props;

        return (
            <tbody>
                {list.length ? list.map((item, idx) =>
                    <tr key={item.code}>
                        <td>
                            <Chkbox 
                                code={item.code} 
                                index={idx}
                                chkList={chkList[idx]}
                                onEachCheck={onEachCheck}
                                onGetCode={onGetCode}
                            />
                        </td>
                        <td>{item.code}</td>
                        <td><img src={item.thumbnail} id="thumbnail"></img></td>
                        <td><b onClick={null}>{item.name}</b></td>
                        <td>{item.price}</td>
                        <td>{item.manufacture}</td>
                        <td>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" 
                                id={item.code} 
                                onClick={onItem}
                            >변경</button> 
                            <button id={item.code} onClick={onDelete}>삭제</button>
                        </td>
                    </tr>
                ) : <tr><td colSpan="7">등록된 제품이 없습니다</td></tr>}

            </tbody>
        );
    }
}

//각 행에 삽입되는 체크박스
class Chkbox extends React.Component {

    render() {
        const { code, index, chkList, onEachCheck, onGetCode } = this.props;

        return (
            <input type="checkbox" className="chk"
                value={code} 
                checked={chkList ? chkList : false}
                onChange={() => {onEachCheck(index)}}
                onClick={() => {onGetCode(event, index)}}
            />
        );
    }
}



//페이지네이션 컴포넌트
class Pagenation extends React.Component {
    render() {
        const { pageList, prev, next, query, onPageMove } = this.props;

        return (
            <div>
                <div onClick={() => onPageMove(prev, query)} >이전</div>
                <div>
                    {pageList.map(page => <div key={page} onClick={() => onPageMove(page, query)}>{page}</div>)}
                </div>
                <div onClick={() => onPageMove(next, query)}>다음</div>
            </div>

        );
    }
}