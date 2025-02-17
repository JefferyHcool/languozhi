import styles from './index.module.css'
import Controller from '@/pages/PaperGeneration/components/Controller'
import Generator from '@/pages/PaperGeneration/components/Generator'

const paperGeneration = () => {
  return (
    <div className={styles.Container}>
      <Controller />
      <div
        className="w-[1px] my-[8px] mr-3 hidden lg:block"
        style={{
          background: 'linear-gradient(rgb(252, 252, 252), rgb(230, 230, 230), rgb(252, 252, 252)), rgb(230, 230, 230)'
        }}
      ></div>
      <Generator />
    </div>
  )
}
export default paperGeneration
