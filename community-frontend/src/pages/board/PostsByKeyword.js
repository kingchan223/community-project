import React, {useEffect} from 'react';
import queryString from 'query-string'

const PostsByKeyword = (props) => {
    const { selected, keyword } = props;
    useEffect(() => {
        // 아래처럼하면 안된다.
        const a = props.params.selected;
        const b = props.params.keyword;
        console.log(a);
        console.log(b);
    }, []);
    return (
        <div>

        </div>
    );
};

export default PostsByKeyword;