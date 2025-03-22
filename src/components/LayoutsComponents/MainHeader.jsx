import { Button, Layout, theme } from 'antd';
import { RxHamburgerMenu } from "react-icons/rx";
const { Header } = Layout;
import avater from '../../assets/avater.png'
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const MainHeader = ({ setCollapsed, collapsed }) => {


    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div >
            <Header
                style={{
                    padding: 0,
                    background: 'white',
                }}
            >
                <div className=' flex justify-between pr-4 bg-white text-black'>
                    <Button
                        type="text"
                        icon={collapsed ? <RxHamburgerMenu className=' text-black -ml-8 w-8 h-8 ' /> : <RxHamburgerMenu className=' text-black -ml-8 w-8 h-8 ' />}
                        onClick={() => setCollapsed(!collapsed)}
                        className=' text-black '
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    /> 

                    <div className='flex items-center  space-x-2 '>
                    <div onClick={() => navigate('notification')} className='bg-secondary h-fit py-2 px-2 mt-2 rounded-full cursor-pointer'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5762 19.3264C21.9066 18.7294 21.3203 18.0451 20.8332 17.2917C20.3009 16.252 19.9821 15.1163 19.8957 13.9514V10.5209C19.9003 8.69143 19.2367 6.92327 18.0295 5.54862C16.8224 4.17397 15.1548 3.28743 13.3401 3.05558V2.15975C13.3401 1.91387 13.2425 1.67806 13.0686 1.5042C12.8947 1.33034 12.6589 1.23267 12.4131 1.23267C12.1672 1.23267 11.9314 1.33034 11.7575 1.5042C11.5836 1.67806 11.486 1.91387 11.486 2.15975V3.06947C9.68754 3.31803 8.04012 4.20993 6.84884 5.57996C5.65756 6.95 5.00315 8.70534 5.00681 10.5209V13.9514C4.92039 15.1163 4.60162 16.252 4.06931 17.2917C3.59075 18.0433 3.01389 18.7276 2.35403 19.3264C2.27996 19.3915 2.22059 19.4716 2.17988 19.5614C2.13917 19.6512 2.11804 19.7487 2.11792 19.8473V20.7917C2.11792 20.9759 2.19108 21.1525 2.32132 21.2827C2.45155 21.413 2.62819 21.4861 2.81236 21.4861H22.1179C22.3021 21.4861 22.4787 21.413 22.609 21.2827C22.7392 21.1525 22.8124 20.9759 22.8124 20.7917V19.8473C22.8122 19.7487 22.7911 19.6512 22.7504 19.5614C22.7097 19.4716 22.6503 19.3915 22.5762 19.3264ZM3.56236 20.0973C4.20833 19.473 4.7772 18.7735 5.25681 18.0139C5.92749 16.7583 6.31839 15.3724 6.40264 13.9514V10.5209C6.3751 9.707 6.51162 8.89591 6.80406 8.13591C7.09651 7.3759 7.5389 6.68252 8.1049 6.09704C8.67089 5.51157 9.34892 5.04598 10.0986 4.728C10.8483 4.41001 11.6543 4.24614 12.4686 4.24614C13.2829 4.24614 14.0889 4.41001 14.8386 4.728C15.5883 5.04598 16.2663 5.51157 16.8323 6.09704C17.3983 6.68252 17.8407 7.3759 18.1332 8.13591C18.4256 8.89591 18.5621 9.707 18.5346 10.5209V13.9514C18.6188 15.3724 19.0097 16.7583 19.6804 18.0139C20.16 18.7735 20.7289 19.473 21.3749 20.0973H3.56236Z" fill="white" />
                            <path d="M12.4998 23.8055C12.9372 23.7954 13.357 23.631 13.6849 23.3412C14.0128 23.0514 14.2277 22.6551 14.2915 22.2222H10.6387C10.7043 22.6668 10.9292 23.0725 11.2715 23.3638C11.6139 23.655 12.0504 23.812 12.4998 23.8055Z" fill="white" />
                        </svg>

                    </div>

                    <div onClick={()=>navigate('profile')} className='flex items-center space-x-2 cursor-pointer'>
                        <div className='h-[42px] w-[42px] rounded-full pt-1 cursor-pointer'>
                            <img className='w-full' src={avater} alt="" />
                        </div>
                        <strong className='text-[20px] font-semibold text-primary'>Jhon Doe</strong>
                    </div>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default MainHeader;