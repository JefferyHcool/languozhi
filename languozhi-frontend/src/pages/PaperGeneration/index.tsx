import styles from './index.module.css'
import Controller from '@/pages/PaperGeneration/components/Controller'
import Generator from '@/pages/PaperGeneration/components/Generator'
const paperGeneration = () => {
  return (
    <div className={styles.Container}>
      <div className={'flex h-full   overflow-y-auto no-scrollbar'}>
        <Controller />
        <div
          className="w-[1px] h-hull my-[8px] mr-3 hidden lg:block"
          style={{
            background:
              'linear-gradient(rgb(252, 252, 252), rgb(230, 230, 230), rgb(252, 252, 252)), rgb(230, 230, 230)'
          }}
        ></div>
        <Generator />
      </div>
    </div>
  )
}
export default paperGeneration
