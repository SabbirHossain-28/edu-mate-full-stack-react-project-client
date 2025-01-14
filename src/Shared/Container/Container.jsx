import PropTypes from "prop-types";

const Container = ({ children }) => {
    return (
      <div className='max-w-[2520px] mx-auto xl:px-16 md:px-10 sm:px-2 px-4 py-10 bg-slate-200 dark:bg-gray-900'>
        {children}
      </div>
    )
  }
  
  Container.propTypes={
    children:PropTypes.node
  }
  export default Container