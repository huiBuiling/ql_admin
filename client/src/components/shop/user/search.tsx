import React, { ReactDOM } from 'react';
import { Input, Button } from 'antd';

interface PageProps {
    label: string | ReactDOM;
    searchVal: string | number;
    changeForm: (e: any) => void;
    onSearch: () => void;
    onReset: () => void;
}

const SearchForm = (props: PageProps) => {
    const { label, searchVal, changeForm, onSearch, onReset } = props;
    return (
        <div className="qlm-search">
            <div>
                <label className="label-red">{label}：</label>
                <Input
                    style={{ width: 230 }}
                    placeholder={`请输入${label}`}
                    value={searchVal}
                    onChange={(e: any) => changeForm(e.target.value)}
                />
            </div>
            <Button type="primary" onClick={onSearch}>查询</Button>
            <Button type="primary" ghost onClick={onReset}>重置</Button>
        </div>
    );
}
export default SearchForm;